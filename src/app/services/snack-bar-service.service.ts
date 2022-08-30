import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }
  snackBarData: {}

  listActivitiesError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "There was a problem listing activities.  Please try again later."
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 6 * 1000,
      data: this.snackBarData
    })
  }

  createActivitySuccess() {
    this.snackBarData = {
      wasSuccessful: true,
      message: "New Activity Created Successfully!"
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 4 * 1000,
      data: this.snackBarData
    })
  }

  createActivityError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "There was a problem creating your activity.  Please try again later."
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 6 * 1000,
      data: this.snackBarData
    })
  }

  deleteActivitySuccess() {
    this.snackBarData = {
      wasSuccessful: true,
      message: "Activity was deleted successfully!"
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 4 * 1000,
      data: this.snackBarData
    })
  }

  deleteActivityError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "There was a problem deleting your activity.  Please try again later."
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 6 * 1000,
      data: this.snackBarData
    })
  }

  editActivitySuccess() {
    this.snackBarData = {
      wasSuccessful: true,
      message: "Activity updated successfully!"
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 4 * 1000,
      data: this.snackBarData
    })
  }

  editActivityError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "There was as problem updating the activity.  Please try again later."
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 6 * 1000,
      data: this.snackBarData
    })
  }
  
  activityTypeListError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "There was a problem listing activity types.  Please try again later." 
  }
  return this.snackBar.openFromComponent(SnackBarComponent, {
    duration: 4 * 1000, 
    data: this.snackBarData
   })
  }

  activityTypeCreateSuccess() {
    this.snackBarData = {
      wasSuccessful: true,
      message: "Activity Type Created Successfully!" 
  }
  return this.snackBar.openFromComponent(SnackBarComponent, {
    duration: 4 * 1000, 
    data: this.snackBarData
   })
  }

  activityTypeCreateError() {
    this.snackBarData = {
      wasSuccessful: false,
      message: "There was a problem creating activity type. Please try again later." 
    }
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 6 * 1000, 
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
