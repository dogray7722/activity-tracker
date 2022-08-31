import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { v4 as uuid } from 'uuid';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ReloadComponentService } from 'src/app/services/reload-component.service';
import { Router } from '@angular/router';

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
  completed: number;
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public type: ActivityType,
    private dialogRef: MatDialogRef<ActivityTypeEditComponent>,
    private activityTypeService: ActivityTypeService,
    private storage: AngularFireStorage,
    private reloadService: ReloadComponentService,
    private router: Router
  ) { }

  fileChangeEvent(event) {
    const newFile: File = event.target.files[0]
    console.log(newFile)
    if (newFile) {
      const picFileName = uuid()
      const reader = new FileReader();
      const fileExt = newFile.name.split('.').pop();
      const newFilePath = `activityTypes/${picFileName}.${fileExt}`
      reader.readAsDataURL(newFile)
      reader.onload = () => {
        this.preview = reader.result as string;
      }
      this.fileName = newFile.name
      this.file = newFile
      this.filePath = newFilePath
    }
  }

  save() {
    this.isLoading = true
    const fileRef = this.storage.refFromURL(this.type.photo)
    fileRef.put(this.file).snapshotChanges().pipe(
      tap(res => this.completed = Math.round(res.bytesTransferred / res.totalBytes * 100)),
      catchError(() => {
        this.dialogRef.close()
        return EMPTY
      }),
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.activityTypeForm.value['photo'] = url
          this.activityTypeForm.value['fileName'] = this.fileName
          this.activityTypeService.updateActivityType(this.activityTypeForm.value)
          this.isLoading = false
          this.dialogRef.close()
          setTimeout(() => {
            this.reloadService.reloadComponent(this.router.url)
          }, 500);
        })
      })
    ).subscribe()
  }

  activityTypeForm = new FormGroup({
    name: new FormControl(this.type.name, Validators.required),
    photo: new FormControl(this.type.photo),
    fileName: new FormControl(this.type.fileName),
    id: new FormControl(this.type.id)
  })
}

export function openEditActivityType(dialog: MatDialog, type: ActivityType) {
  const dialogConfig = new MatDialogConfig()
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "35%";
  dialogConfig.data = {
    ...type
  }
  const dialogRef = dialog.open(ActivityTypeEditComponent, dialogConfig)
  return dialogRef.afterClosed();
}
