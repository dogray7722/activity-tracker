import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) private activity: Activity,
    private dialogRef: MatDialogRef<EditActivityComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  form = this.fb.group({
    type: [this.activity.type, Validators.required],
    title: [this.activity.title, Validators.required],
    location: [this.activity.location, Validators.required],
    date: [this.activity.date, Validators.required],
    notes: [this.activity.notes]
  })

}

export function openEditActivity(dialog: MatDialog, activity: Activity) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "52%"
  dialogConfig.data = {
    ...activity
  }
  const dialogRef = dialog.open(EditActivityComponent, dialogConfig)
  return dialogRef.afterClosed();

}
