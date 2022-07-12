import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
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

export function openDeleteActivity(dialog: MatDialog, activity: Activity) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.width = "30%";
  dialogConfig.data = {
    ...activity
  }
  const dialogRef = dialog.open(DeleteActivityComponent, dialogConfig)
  return dialogRef.afterClosed();
}


