import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Activity } from 'src/app/Activity';
import { ActivityService } from 'src/app/services/activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-activity',
  templateUrl: './delete-activity.component.html'
})
export class DeleteActivityComponent implements OnInit {
  act = this.activity

  constructor(
              @Inject(MAT_DIALOG_DATA) private activity: Activity,
              private dialogRef: MatDialogRef<DeleteActivityComponent>,
              private activityService: ActivityService,
              private router: Router) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  delete(act) {
    this.activityService.deleteActivity(act).subscribe();
    this.dialogRef.close();
    this.reloadComponent();
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

}

export function openDeleteActivity(dialog: MatDialog, activity: Activity) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.data = {
    ...activity
  }
  const dialogRef = dialog.open(DeleteActivityComponent, dialogConfig)
  return dialogRef.afterClosed();
}


