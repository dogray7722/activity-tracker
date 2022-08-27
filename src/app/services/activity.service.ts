import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Activity } from '../Activity';
import { map, catchError, tap, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SnackBarService } from './snack-bar-service.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = 'https://activitytracker-21247-default-rtdb.firebaseio.com/activities'
  
  constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

  getActivities() {
    return this.http.get<{ [key: string]: Activity }>(`${this.baseUrl}.json`).pipe(
      map(responseData => {
        const resultArray: Activity[] = []
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            resultArray.push({ ...responseData[key], id: key })
          }
        }
        return resultArray;
      })
    )
  }

  addActivity(activity: Activity): void {
    this.http.post<Activity>(`${this.baseUrl}.json`, activity, httpOptions).pipe(
      catchError((error) => {
        this.snackBarService.createActivityError()
        return throwError(() => new Error(error))
      })
    ).subscribe()
  }

  putActivity(activity: Activity): Observable<Activity> {
    const url = `${this.baseUrl}/${activity.id}`
    return this.http.put<Activity>(url, activity, httpOptions)
  }

  deleteActivity(activity: Activity): Observable<Activity> {
    const url = `${this.baseUrl}/${activity.id}.json`
    return this.http.delete<Activity>(url)
  }

}
