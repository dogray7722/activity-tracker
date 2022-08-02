import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { PictureUploaderService } from 'src/app/services/picture-uploader.service';

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
  activityTypeName: string
  

  constructor(private dialogRef: MatDialogRef<ActivityTypeCreateComponent>,
              private activityTypeService: ActivityTypeService, 
              private picUploadService: PictureUploaderService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.picUploadService.uploadPhoto(this.filePath, this.file).snapshotChanges().subscribe(res => {
      console.log(res)
    })
    
    // this.activityTypeService.createActivityType().subscribe
  
    this.dialogRef.close();
  }

  fileChangeEvent(event) {
    const newFile: File = event.target.files[0]

    if (newFile) {
      const picFileName = uuid()
      this.fileName = newFile.name
      let fileExt = newFile.name.split('.').pop();
      const newFilePath = `activityTypes/${picFileName}.${fileExt}`
      this.file = newFile
      this.filePath = newFilePath
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
