import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map } from 'rxjs';
import { ActivityType } from '../ActivityType';
import { SnackBarService } from './snack-bar-service.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService {
  private baseUrl = 'https://activitytracker-21247-default-rtdb.firebaseio.com/activity_types'

  constructor(private http: HttpClient,
              private snackBarService: SnackBarService,
              private authService: AuthService) { }

  getActivityTypes() {
    return this.http.get<{ [key: string]: ActivityType }>(`${this.baseUrl}.json`).pipe(
      map(responseData => {
        const activityTypes: ActivityType[] = []
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            activityTypes.push({ ...responseData[key], id: key})
          }
        }
        return activityTypes;
      }),
      catchError(() => {
        this.snackBarService.snackBarMessage(false, "activityTypeListError")
        return EMPTY
      })
    )
  }

  createActivityType(activityType: ActivityType){
    this.http.post<ActivityType>(`${this.baseUrl}.json`, activityType).pipe(
      catchError(() => {
        this.snackBarService.snackBarMessage(false, "activityTypeCreateError")
        return EMPTY
      })
    ).subscribe(
      () => {
        this.snackBarService.snackBarMessage(true, "activityTypeCreateSuccess")
      }
    )
  }

  deleteActivityType(activityType: ActivityType) {
    const url = `${this.baseUrl}/${activityType.id}.json`
    this.http.delete<ActivityType>(url).pipe(
      catchError(() => {
        this.snackBarService.snackBarMessage(false, "activityTypeDeleteError")
        return EMPTY
      })
    ).subscribe(
      () => {
        this.snackBarService.snackBarMessage(true, "activityTypeDeleteSuccess")
      }
    )
  }

  updateActivityType(activityType: ActivityType) {
    const url = `${this.baseUrl}/${activityType.id}.json`
    this.http.put<ActivityType>(url, activityType).pipe(
      catchError(() => {
        this.snackBarService.snackBarMessage(false, "activityTypeEditError")
        return EMPTY
      })
    ).subscribe(
      () => {
        this.snackBarService.snackBarMessage(true, "activityTypeEditSuccess")
      }
    )
  }
}
