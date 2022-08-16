import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { v4 as uuid } from 'uuid';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { ReloadComponentService } from 'src/app/services/reload-component.service';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activity-type-edit',
  templateUrl: './activity-type-edit.component.html',
  styleUrls: ['./activity-type-edit.component.css']
})
export class ActivityTypeEditComponent {
  fileName = this.type.fileName
  file: File;
  filePath: string;
  preview = this.type.photo
  snackBarData: {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public type: ActivityType,
    private dialogRef: MatDialogRef<ActivityTypeEditComponent>,
    private activityTypeService: ActivityTypeService,
    private storage: AngularFireStorage,
    private reloadService: ReloadComponentService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  close() {
    this.dialogRef.close()
  }

  fileChangeEvent(event) {
    const newFile: File = event.target.files[0]
    if (newFile) {
      const picFileName = uuid()
      this.fileName = newFile.name
      let fileExt = newFile.name.split('.').pop();
      let newFilePath = `activityTypes/${picFileName}.${fileExt}`
      this.file = newFile
      this.filePath = newFilePath
    }
  }

  save() {
    this.storage.refFromURL(this.type.photo).delete().subscribe()
    const fileRef = this.storage.ref(this.filePath)
    this.storage.upload(this.filePath, this.file).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.activityTypeForm.value['photo'] = url
          this.activityTypeForm.value['fileName'] = this.fileName
          this.activityTypeService.updateActivityType(this.activityTypeForm.value).subscribe()
          this.dialogRef.close()
          this.reloadService.reloadComponent(this.router.url)
          this.openSnackBarSuccess();
        })
      })
    )
  }

  openSnackBarSuccess() {
    this.snackBarData = {
        wasSuccessful: true,
        message: "Activity Type Updated Successfully!" 
    }
    this.snackBar.openFromComponent(SnackBarComponent, {duration: 4 * 1000, 
      data: this.snackBarData
     })
  }

  activityTypeForm = new FormGroup({
    name: new FormControl(this.type.name, Validators.required),
    photo: new FormControl(this.type.photo),
    fileName: new FormControl(this.type.fileName)
  })
}

export function openEditActivityType(dialog: MatDialog, type: ActivityType) {
  const dialogConfig = new MatDialogConfig()
  dialogConfig.disableClose = true;
  dialogConfig.data = {
    ...type
  }
  const dialogRef = dialog.open(ActivityTypeEditComponent, dialogConfig)
  return dialogRef.afterClosed();
}
