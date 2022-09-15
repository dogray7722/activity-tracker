import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/Activity';
import { openDeleteActivity } from '../delete-activity/delete-activity.component';
import { openEditActivity } from '../edit-activity/edit-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivityService } from 'src/app/services/activity.service';
import {ActivatedRoute} from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit{
  activity: Activity

  constructor(private dialog: MatDialog,
              private activityService: ActivityService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //get id off the route
    const id = this.activatedRoute.params.pipe(map(
      p => console.log(p)
    ))
    // this.activityService.getActivity("1").subscribe
  }

  editActivity(activity:Activity) {
    openEditActivity(this.dialog, activity)
  }

  deleteActivity(activity:Activity) {
    openDeleteActivity(this.dialog, activity)
  }
}
