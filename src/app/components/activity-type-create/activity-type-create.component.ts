import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';

@Component({
  selector: 'app-activity-type-create',
  templateUrl: './activity-type-create.component.html',
  styles: [
  ]
})
export class ActivityTypeCreateComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ActivityTypeCreateComponent>,
  ) { }

  ngOnInit(): void {
  }

}

export function openCreateActivityType(dialog: MatDialog, activityType: ActivityType) {

}
