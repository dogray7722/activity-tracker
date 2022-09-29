import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { EMPTY, throwError, tap} from 'rxjs';
import { Activity } from '../Activity';
import { map, catchError} from 'rxjs/operators';
import { SnackBarService } from './snack-bar-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  userId: string
  private baseUrl = 'https://activitytracker-21247-default-rtdb.firebaseio.com/activities'
  
  constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

  getActivities() {
    return this.http.get<{ [key: string]: Activity }>(`${this.baseUrl}.json`).pipe(
      tap(() =>{
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.userId = userData.id
      }),
      map(responseData => {
        const activities: Activity[] = []
        for (const key in responseData) {
          if (this.userId === responseData[key].userId || responseData[key].userId === "starter") {
            activities.push({ ...responseData[key], id: key })
          }
        }
        return activities;
      }),
      catchError((error) => {
        this.snackBarService.snackBarMessage(false, "listActivitiesError")
        return throwError(() => new Error(error))
      })
    )
  }

  addActivity(activity: Activity) {
    this.http.post<Activity>(`${this.baseUrl}.json`, activity).pipe(
      tap((res) => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        res.userId = userData.id
      }),
      catchError(() => {
        this.snackBarService.snackBarMessage(false, "createActivityError")
        return EMPTY
      })
    ).subscribe(() => {
      this.snackBarService.snackBarMessage(true, "createActivitySuccess")
    })
  }

  putActivity(activity: Activity) {
    if (activity.userId === null || activity.userId === undefined) {
      const userData = JSON.parse(localStorage.getItem('userData'))
      activity.userId = userData.id
    }
    const url = `${this.baseUrl}/${activity.id}.json`
    return this.http.put<Activity>(url, activity).pipe(
      catchError(() => {
        this.snackBarService.snackBarMessage(false, "editActivityError")
        return EMPTY
      })
    ).subscribe(() => {
      this.snackBarService.snackBarMessage(true, "editActivitySuccess")
    })
  }

  deleteActivity(activity: Activity) {
    const url = `${this.baseUrl}/${activity.id}.json`
    this.http.delete<Activity>(url).pipe(
      catchError(() => {
        this.snackBarService.snackBarMessage(false, "deleteActivityError")
        return EMPTY
      })
    ).subscribe(() => {
      this.snackBarService.snackBarMessage(true, "deleteActivitySuccess")
    })
  }
}