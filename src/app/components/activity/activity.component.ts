import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';
import { openEditActivity } from '../edit-activity/edit-activity.component';
import {filter} from 'rxjs/operators';
import { ActivityService } from 'src/app/services/activity.service';

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



}
