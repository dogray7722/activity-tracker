import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Activity } from '../Activity';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'https://activitytracker-21247-default-rtdb.firebaseio.com/activities.json'

  constructor(private http: HttpClient) { }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiUrl)
  }

  addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.apiUrl, activity, httpOptions)
  }

  putActivity(activity: Activity): Observable<Activity> {
    const url = `${this.apiUrl}/${activity.id}`
    return this.http.put<Activity>(url, activity, httpOptions)
  }

  deleteActivity(activity: Activity): Observable<Activity> {
    const url = `${this.apiUrl}/${activity.id}`
    return this.http.delete<Activity>(url)
  }

}
