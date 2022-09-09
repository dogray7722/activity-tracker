import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';
import { openEditActivity } from '../edit-activity/edit-activity.component';
import { openDeleteActivity } from '../delete-activity/delete-activity.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  editActivity(activity:Activity) {
    openEditActivity(this.dialog, activity)
  }

  deleteActivity(activity:Activity) {
    openDeleteActivity(this.dialog, activity)
  }
}
