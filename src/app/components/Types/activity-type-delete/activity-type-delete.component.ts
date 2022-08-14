import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { ActivityService } from 'src/app/services/activity.service';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-type-delete',
  templateUrl: './activity-type-delete.component.html',
  styleUrls: ['./activity-type-delete.component.css']
})
export class ActivityTypeDeleteComponent {
  type = this.activityType
  activities: Activity[] = []
  snackBarData: {}
  typeInUse: boolean = false
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private activityType: ActivityType,
    private activityService: ActivityService,
    private activityTypeService: ActivityTypeService,
    private dialogRef: MatDialogRef<ActivityTypeDeleteComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  cancel() {
    this.dialogRef.close()
  }

  handleDelete(typeInUse: boolean, type: ActivityType) {
    if (typeInUse) {
      this.openSnackBarError()
    } else {
      this.activityTypeService.deleteActivityType(type).subscribe();
    }
    this.dialogRef.close()
    this.reloadComponent()
  }

  delete(type) {
    this.activityService.getActivities().subscribe(
      {
      next: (result) => {
        this.activities = result
      },
      complete: () => {
        this.activities.map(
          act => {
            if (act.type === type.name){
              this.typeInUse = true
              return
            } 
          }
        )
        this.handleDelete(this.typeInUse, this.type)
      }
      })
    }

  openSnackBarError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "Cannot delete type while applied to existing activities.  Please remove this activity type from all activities and try again." 
    }
    this.snackBar.openFromComponent(SnackBarComponent,{duration: 6 * 1000, 
      data: this.snackBarData
    })
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

}

export function openDeleteActivityType(dialog: MatDialog, type: ActivityType) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.data = {
    ...type
  }
  const dialogRef = dialog.open(ActivityTypeDeleteComponent, dialogConfig)
  return dialogRef.afterClosed();
}
