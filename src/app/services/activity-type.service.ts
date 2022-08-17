import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityType } from '../ActivityType';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService {
  private apiUrl = 'http://localhost:9000/activity_types'

  constructor(private http: HttpClient) { }

  getActivityTypes(): Observable<ActivityType[]> {
    return this.http.get<ActivityType[]>(this.apiUrl)
  }

  createActivityType(activityType: ActivityType): Observable<ActivityType> {
    return this.http.post<ActivityType>(this.apiUrl, activityType)
  }

  deleteActivityType(activityType: ActivityType): Observable<ActivityType> {
    const url = `${this.apiUrl}/${activityType.id}`
    return this.http.delete<ActivityType>(url, httpOptions)
  }

  updateActivityType(activityType: ActivityType): Observable<ActivityType> {
    const url = `${this.apiUrl}/${activityType.id}`
    return this.http.put<ActivityType>(url, activityType, httpOptions)
  }
}
