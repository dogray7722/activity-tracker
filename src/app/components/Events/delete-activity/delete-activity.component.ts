import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Activity } from 'src/app/Activity';
import { ActivityService } from 'src/app/services/activity.service';
import { Router } from '@angular/router';
import { ReloadComponentService } from 'src/app/services/reload-component.service';
import { SnackBarService } from 'src/app/services/snack-bar-service.service';  

@Component({
  selector: 'app-delete-activity',
  templateUrl: './delete-activity.component.html'
})
export class DeleteActivityComponent {
  act = this.activity

  constructor(
              @Inject(MAT_DIALOG_DATA) private activity: Activity,
              private dialogRef: MatDialogRef<DeleteActivityComponent>,
              private activityService: ActivityService,
              private router: Router,
              private reloadService: ReloadComponentService,
              private snackBarService: SnackBarService) { }

  delete(act) {
    this.activityService.deleteActivity(act).subscribe();
    this.snackBarService.deleteActivitySuccess()
    this.dialogRef.close();
    setTimeout(() => {
      this.reloadService.reloadComponent(this.router.url)
    }, 1000);
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


