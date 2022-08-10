import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, pipe } from 'rxjs';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity-type-delete',
  templateUrl: './activity-type-delete.component.html',
  styleUrls: ['./activity-type-delete.component.css']
})
export class ActivityTypeDeleteComponent implements OnInit {
  type = this.activityType
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private activityType: ActivityType,
    private activityTypeService: ActivityTypeService,
    private activityService: ActivityService,
    private dialogRef: MatDialogRef<ActivityTypeDeleteComponent>
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close()
  }

  delete(type) {
    this.activityService.getActivities().pipe(
      
    )
    //call the getActivities function from the activity service
    //loop through the results, and if the activity type name passed in here
    //is on one of the current activities

    this.activityTypeService.deleteActivityType(type).subscribe();
    this.dialogRef.close()
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
