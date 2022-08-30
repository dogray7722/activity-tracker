import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, EMPTY, map } from 'rxjs';
import { ActivityType } from '../ActivityType';
import { SnackBarService } from './snack-bar-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService {
  private baseUrl = 'https://activitytracker-21247-default-rtdb.firebaseio.com/activity_types'

  constructor(private http: HttpClient,
              private snackBarService: SnackBarService) { }

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
      })
    )
  }

  createActivityType(activityType: ActivityType){
    this.http.post<ActivityType>(`${this.baseUrl}.json`, activityType).pipe(
      catchError(() => {
        this.snackBarService.activityTypeCreateError()
        return EMPTY
      })
    ).subscribe(
      () => {
        this.snackBarService.activityTypeCreateSuccess()
      }
    )
  }

  deleteActivityType(activityType: ActivityType): Observable<ActivityType> {
    const url = `${this.baseUrl}/${activityType.id}.json`
    return this.http.delete<ActivityType>(url)
  }

  updateActivityType(activityType: ActivityType): Observable<ActivityType> {
    const url = `${this.baseUrl}/${activityType.id}.json`
    return this.http.put<ActivityType>(url, activityType)
  }
}
