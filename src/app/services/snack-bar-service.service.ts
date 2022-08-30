import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }
  snackBarData: {}
  duration: number;
  message: string;

  snackBarMessage(success: boolean, messageType: string) {
    switch (messageType) {
      case "listActivitiesError": {
        this.message = "There was a problem listing activities.  Please try again later."
        break;
      }
      case "createActivitySuccess": {
        this.message = "New Activity Created Successfully!"
        break
      }
      case "createActivityError": {
        this.message = "There was a problem creating your activity.  Please try again later."
        break
      }
      case "deleteActivitySuccess": {
        this.message = "Activity deleted successfully!"
        break
      }
      case "deleteActivityError": {
        this.message = "There was a problem deleting your activity.  Please try again later."
        break
      }
      case "editActivitySuccess": {
        this.message = "Activity updated successfully!"
        break
      }
      case "editActivityError": {
        this.message = "There was as problem updating the activity.  Please try again later."
        break
      }
      case "activityTypeListError": {
        this.message = "There was a problem listing activity types.  Please try again later."
        break
      }
      case "activityTypeCreateSuccess": {
        this.message = "Activity Type Created Successfully!"
        break
      }
      case "activityTypeCreateError": {
        this.message = "There was a problem creating activity type. Please try again later."
        break
      }

    }
    
    this.snackBarData = {
      wasSuccessful: success,
      message: this.message
    }

    if (success) {
      this.duration = 4 * 1000 
    } else {
      this.duration = 6 * 1000
    }

    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.duration,
      data: this.snackBarData
    })
  }

  activityTypeDeleteSuccess() {
    this.snackBarData = {
      wasSuccessful: true,
      message: "Activity Type Deleted Successfully!"
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 4 * 1000,
      data: this.snackBarData
    })
  }

  activityTypeDeleteInUseError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "Cannot delete type while applied to existing activities.  Please remove this activity type from all activities and try again." 
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 6 * 1000, 
      data: this.snackBarData
    })
  }

  activityTypeDeleteError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "There was a problem deleting activity type.  Please try again later" 
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 6 * 1000, 
      data: this.snackBarData
    })
  }

  activityTypeEditSuccess() {
    this.snackBarData = {
      wasSuccessful: true,
      message: "Activity Type Updated Successfully!" 
  }
  return this.snackBar.openFromComponent(SnackBarComponent, {
    duration: 4 * 1000, 
    data: this.snackBarData
   })
  }

  activityTypeEditError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "There was a problem editing activity type.  Please try again later." 
  }
  return this.snackBar.openFromComponent(SnackBarComponent, {
    duration: 6 * 1000, 
    data: this.snackBarData
   })
  }
}
