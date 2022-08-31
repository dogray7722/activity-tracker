import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { ActivityService } from 'src/app/services/activity.service';
import { Router } from '@angular/router';
import { ReloadComponentService } from 'src/app/services/reload-component.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError, EMPTY, finalize, of } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar-service.service';

@Component({
  selector: 'app-activity-type-delete',
  templateUrl: './activity-type-delete.component.html',
  styleUrls: ['./activity-type-delete.component.css']
})
export class ActivityTypeDeleteComponent {
  type = this.activityType
  activities: Activity[] = []
  typeInUse: boolean = false
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private activityType: ActivityType,
    private activityService: ActivityService,
    private activityTypeService: ActivityTypeService,
    private dialogRef: MatDialogRef<ActivityTypeDeleteComponent>,
    private snackBarService: SnackBarService,
    private router: Router,
    private reloadService: ReloadComponentService,
    private storage: AngularFireStorage
  ) { }

  handleDelete(typeInUse: boolean, type: ActivityType) {
    if (typeInUse) {
      this.snackBarService.snackBarMessage(false, "activityTypeDeleteInUseError")
      this.dialogRef.close()
      return
    } else {
      this.storage.refFromURL(type.photo).delete().pipe(
        catchError(() => {
          this.snackBarService.snackBarMessage(false, "activityTypeDeleteError")
          this.dialogRef.close()
          return EMPTY
        }), 
        finalize(() => {
          this.activityTypeService.deleteActivityType(type)
          this.cleanup()
        })
      ).subscribe()
    }
    this.cleanup()
  }

  cleanup() {
    this.dialogRef.close()
    setTimeout(() => {
      this.reloadService.reloadComponent(this.router.url)
    }, 500);
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
