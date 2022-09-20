import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { ActivityType } from '../ActivityType';
import { SnackBarService } from './snack-bar-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService {
  userId: string
  private baseUrl = 'https://activitytracker-21247-default-rtdb.firebaseio.com/activity_types'

  constructor(private http: HttpClient,
              private snackBarService: SnackBarService) { }

  getActivityTypes() {
    return this.http.get<{ [key: string]: ActivityType }>(`${this.baseUrl}.json`).pipe(
      tap(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.userId = userData.id
      }),
      map(responseData => {
        const activityTypes: ActivityType[] = []
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key) && this.userId == responseData[key].userId) {
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