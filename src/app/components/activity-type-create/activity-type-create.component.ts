import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-activity-type-create',
  templateUrl: './activity-type-create.component.html',
  styleUrls: ['./activity-type-create.component.css']
})
export class ActivityTypeCreateComponent implements OnInit {
  fileName: string
  file: File
  filePath: string
  activityTypeForm = new FormGroup({
    name: new FormControl(''),
    photo: new FormControl('')
  })

  constructor(private dialogRef: MatDialogRef<ActivityTypeCreateComponent>,
              private activityTypeService: ActivityTypeService, 
              private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.resetForm()
  }

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
    //if there's no file or it's invalid, pop a warning message
    if (this.filePath && this.file) {
      const fileRef = this.storage.ref(this.filePath)
      this.storage.upload(this.filePath, this.file).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['photo'] = url
            console.log(formValue)
            // this.addType(formValue)
            // this.resetForm();
          })
        })
      ).subscribe();
    }

    
    //if the file fails to save, pop an error
    // this.dialogRef.close();
  }


  resetForm() {
    this.activityTypeForm.reset()
    this.activityTypeForm.setValue({
      name: '',
      photo: ''
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
