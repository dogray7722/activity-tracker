import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';
import { ActivityService } from 'src/app/services/activity.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  selected = this.activity.type

  constructor(private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) private activity: Activity,
    private dialogRef: MatDialogRef<EditActivityComponent>,
    private activityService: ActivityService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    const newDate = this.datePipe.transform(this.form.value["date"],  'mediumDate')
    this.form.value["date"] = newDate
    this.activityService.putActivity(this.form.value).subscribe()
    this.dialogRef.close();
    window.location.reload();
  }

  form = this.fb.group({
    id: [this.activity.id],
    type: [this.activity.type, Validators.required],
    title: [this.activity.title, Validators.required],
    location: [this.activity.location, Validators.required],
    date: [new Date(this.activity.date), Validators.required],
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
