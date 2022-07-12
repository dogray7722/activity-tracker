import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { Activity } from 'src/app/Activity';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-delete-activity',
  templateUrl: './delete-activity.component.html',
  styleUrls: ['./delete-activity.component.css']
})
export class DeleteActivityComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteActivityComponent>,
              private activity: Activity,
              private activityService: ActivityService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  delete(activity) {
    this.activityService.deleteActivity(activity);
    this.dialogRef.close();
    window.location.reload();
  }

}


