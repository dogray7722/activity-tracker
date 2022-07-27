import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-activity-type-create',
  templateUrl: './activity-type-create.component.html',
  styles: [
  ]
})
export class ActivityTypeCreateComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ActivityTypeCreateComponent>,
              private activityTypeService: ActivityTypeService,
              private fb: FormBuilder,
              private storage: AngularFireStorage
              
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close();
  }

  fileChangeEvent(event) {
    const file: File = event.target.files[0]

    if (file) {
      const picFileName = uuid()
      let fileExt = file.name.split('.').pop();
      const filePath = `activityTypes/${picFileName}.${fileExt}`
      console.log(filePath)
      this.storage.upload(filePath, file)
    }
  }

  form = this.fb.group({
    name: ["", Validators.required],
  });


}

export function openCreateActivityType(dialog: MatDialog) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  const dialogRef = dialog.open(ActivityTypeCreateComponent, dialogConfig)
  return dialogRef.afterClosed();
}
