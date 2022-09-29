import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { ReloadComponentService } from 'src/app/services/reload-component.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activity-type-create',
  templateUrl: './activity-type-create.component.html',
  styleUrls: ['./activity-type-create.component.css']
})
export class ActivityTypeCreateComponent {
  fileName: string;
  file: File;
  filePath: string;
  activityTypeForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    photo: new UntypedFormControl(null),
    fileName: new UntypedFormControl('')
  });
  isLoading = false;
  completed: number;
  preview = null;
  userId: string;
  tooLarge = false;

  constructor(private dialogRef: MatDialogRef<ActivityTypeCreateComponent>,
              private activityTypeService: ActivityTypeService, 
              private storage: AngularFireStorage,
              private router: Router,
              private reloadService: ReloadComponentService,
              private authService: AuthService
  ) { }

  addType(activityType: ActivityType) {
    this.activityTypeService.createActivityType(activityType)
  }

  fileChangeEvent(event) {
    const newFile: File = event.target.files[0]
    if (newFile) {
      if (newFile.size > 7 * 1024 * 1024) {
        this.tooLarge = true
      }
      const reader = new FileReader();
      const picFileName = uuid()
      this.fileName = newFile.name
      let fileExt = newFile.name.split('.').pop();
      let newFilePath = `activityTypes/${picFileName}.${fileExt}`

      reader.readAsDataURL(newFile)
      reader.onload = () => {
        this.preview = reader.result as string;
      }
      this.file = newFile
      this.filePath = newFilePath
    }
  }

  save(formValue) {
    if (this.filePath && this.file) {
      this.authService.user.subscribe(res => {
        this.userId = res.id
      })
      const fileRef = this.storage.ref(this.filePath)
      this.isLoading = true
      this.storage.upload(this.filePath, this.file).snapshotChanges().pipe(
        tap(res => this.completed = Math.round(res.bytesTransferred / res.totalBytes * 100)),
        catchError(() => {
            this.dialogRef.close()
            this.reloadService.reloadComponent(this.router.url);
            return EMPTY
        }),
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['photo'] = url
            formValue['fileName'] = this.fileName
            formValue['userId'] = this.userId
            this.addType(formValue)
            this.isLoading = false
            this.dialogRef.close()
            setTimeout(() => {
              this.reloadService.reloadComponent(this.router.url);
            }, 500);
          })
        })
      ).subscribe()
    }
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