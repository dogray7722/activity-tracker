import { Component } from '@angular/core';
import { Activity } from 'src/app/Activity';
import { openDeleteActivity } from '../delete-activity/delete-activity.component';
import { openEditActivity } from '../edit-activity/edit-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent {
  activity: Activity

  constructor(private dialog: MatDialog,
              private router: Router
              ) { 
                this.activity = this.router.getCurrentNavigation().extras.state['act']
              }

  editActivity(activity:Activity) {
    openEditActivity(this.dialog, activity)
  }

  deleteActivity(activity:Activity) {
    openDeleteActivity(this.dialog, activity)
  }

  return() {
    this.router.navigate(['/events'])
  }
}
