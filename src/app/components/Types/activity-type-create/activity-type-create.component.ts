import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { ReloadComponentService } from 'src/app/services/reload-component.service';

@Component({
  selector: 'app-activity-type-create',
  templateUrl: './activity-type-create.component.html',
  styleUrls: ['./activity-type-create.component.css']
})
export class ActivityTypeCreateComponent {
  fileName: string;
  file: File;
  filePath: string;
  activityTypeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    photo: new FormControl(null),
    fileName: new FormControl('')
  });
  isLoading = false;
  completed: number;
  snackBarData: {}

  constructor(private dialogRef: MatDialogRef<ActivityTypeCreateComponent>,
              private activityTypeService: ActivityTypeService, 
              private storage: AngularFireStorage,
              private router: Router,
              private snackBar: MatSnackBar,
              private reloadService: ReloadComponentService
              
  ) { }

  close() {
    this.dialogRef.close();
  }

  addType(activityType: ActivityType) {
    this.activityTypeService.createActivityType(activityType).subscribe()
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

  onSubmit(formValue) {
    if (this.filePath && this.file) {
      const fileRef = this.storage.ref(this.filePath)
      this.isLoading = true
      this.storage.upload(this.filePath, this.file).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['photo'] = url
            formValue['fileName'] = this.fileName
            this.addType(formValue)
            this.isLoading = false
            this.dialogRef.close()
            this.reloadService.reloadComponent(this.router.url);
            this.openSnackBarSuccess();
          })
        })
        ).subscribe({
          next: (res) => this.completed = Math.round(res.bytesTransferred / res.totalBytes * 100)
      })
    } 
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  openSnackBarSuccess() {
    this.snackBarData = {
        wasSuccessful: true,
        message: "Activity Type Created Successfully!" 
    }
    this.snackBar.openFromComponent(SnackBarComponent, {duration: 4 * 1000, 
      data: this.snackBarData
     })
  }

  openSnackBarError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "There was a problem creating activity type." 
    }
    this.snackBar.openFromComponent(SnackBarComponent,{duration: 4 * 1000, 
      data: this.snackBarData
    })
  }
}

export function openCreateActivityType(dialog: MatDialog) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "35%";
  const dialogRef = dialog.open(ActivityTypeCreateComponent, dialogConfig)
  return dialogRef.afterClosed();
}




