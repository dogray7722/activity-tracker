import { Component, Inject, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityService } from 'src/app/services/activity.service';
import { DatePipe } from '@angular/common';
import { Router, } from '@angular/router';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { ReloadComponentService } from 'src/app/services/reload-component.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  activityTypes: ActivityType[] = [];

  constructor(private fb: UntypedFormBuilder, 
    @Inject(MAT_DIALOG_DATA) private activity: Activity,
    private dialogRef: MatDialogRef<EditActivityComponent>,
    private activityService: ActivityService,
    private activityTypeService: ActivityTypeService,
    private datePipe: DatePipe,
    private router: Router,
    private reloadService: ReloadComponentService,
   ) { }

  ngOnInit(): void {
    this.activityTypeService.getActivityTypes().subscribe(resp => this.activityTypes = resp)
  }

  save() {
    const newDate = this.datePipe.transform(this.form.value["date"],  'mediumDate')
    this.form.value["date"] = newDate
    this.activityService.putActivity(this.form.value)
    this.dialogRef.close();
    setTimeout(() => {
      if (this.router.url === '/events') {
        this.reloadService.reloadComponent(this.router.url)
      } else {
        this.router.navigate(['/events'])
      }
    }, 500);
  }

  form = this.fb.group({
    id: [this.activity.id],
    type: [this.activity.type, Validators.required],
    title: [this.activity.title, Validators.required],
    location: [this.activity.location, Validators.required],
    date: [new Date(this.activity.date), Validators.required],
    notes: [this.activity.notes],
    userId: [this.activity.userId ? this.activity.userId : '']
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