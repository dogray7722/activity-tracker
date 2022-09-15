import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';
import { openEditActivity } from '../edit-activity/edit-activity.component';
import { openDeleteActivity } from '../delete-activity/delete-activity.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  @Input() activity: Activity
  constructor(private dialog: MatDialog,
              private router: Router) { }

  editActivity(activity: Activity) {
    openEditActivity(this.dialog, activity)
  }

  deleteActivity(activity: Activity) {
    openDeleteActivity(this.dialog, activity)
  }

  openDetail(activityId: string) {
    this.router.navigate(['/events', `/${activityId}`])
  }
}
