import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';

@Component({
  selector: 'app-activity-type-create',
  templateUrl: './activity-type-create.component.html',
  styles: [
  ]
})
export class ActivityTypeCreateComponent implements OnInit {
  fileName = "";
  color = "green"

  constructor(private dialogRef: MatDialogRef<ActivityTypeCreateComponent>,
              private activityTypeService: ActivityTypeService,
              private fb: FormBuilder
              
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
      console.log(file)
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file)
      //add call to firebase cloud store service here
      //subscribe to the result
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
  dialogConfig.width = "50%";
  const dialogRef = dialog.open(ActivityTypeCreateComponent, dialogConfig)
  return dialogRef.afterClosed();
}
