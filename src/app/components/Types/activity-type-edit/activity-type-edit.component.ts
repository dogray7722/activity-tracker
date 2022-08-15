import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-activity-type-edit',
  templateUrl: './activity-type-edit.component.html',
  styles: [
  ]
})
export class ActivityTypeEditComponent {
  fileName = this.type.photo
  file: File;
  filePath: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public type: ActivityType,
    private dialogRef: MatDialogRef<ActivityTypeEditComponent>,
    private activityTypeService: ActivityTypeService,
    private fb: FormBuilder
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
    this.activityTypeService.updateActivityType(this.activityTypeForm.value).subscribe()
    this.dialogRef.close()
  }

  activityTypeForm = new FormGroup({
    name: new FormControl(this.type.name),
    photo: new FormControl(this.type.photo)
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
