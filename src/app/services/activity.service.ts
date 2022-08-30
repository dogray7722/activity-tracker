import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { EMPTY, Observable } from 'rxjs';
import { Activity } from '../Activity';
import { map, catchError} from 'rxjs/operators';
import { SnackBarService } from './snack-bar-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = 'https://activitytracker-21247-default-rtdb.firebaseio.com/activities'
  
  constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

  getActivities() {
    return this.http.get<{ [key: string]: Activity }>(`${this.baseUrl}.json`).pipe(
      map(responseData => {
        const activities: Activity[] = []
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            activities.push({ ...responseData[key], id: key })
          }
        }
        return activities;
      }),
      catchError(() => {
        this.snackBarService.listActivitiesError()
        return EMPTY
      })
    )
  }

  addActivity(activity: Activity) {
    this.http.post<Activity>(`${this.baseUrl}.json`, activity).pipe(
      catchError(() => {
        this.snackBarService.createActivityError()
        return EMPTY
      })
    ).subscribe(() => {
      this.snackBarService.createActivitySuccess()
    })
  }

  putActivity(activity: Activity) {
    const url = `${this.baseUrl}/${activity.id}.json`
    return this.http.put<Activity>(url, activity).pipe(
      catchError(() => {
        this.snackBarService.editActivityError()
        return EMPTY
      })
    ).subscribe(() => {
      this.snackBarService.editActivitySuccess()
    })
  }

  deleteActivity(activity: Activity) {
    const url = `${this.baseUrl}/${activity.id}.json`
    this.http.delete<Activity>(url).pipe(
      catchError(() => {
        this.snackBarService.deleteActivityError()
        return EMPTY
      })
    ).subscribe(() => {
      this.snackBarService.deleteActivitySuccess()
    })
  }
}
