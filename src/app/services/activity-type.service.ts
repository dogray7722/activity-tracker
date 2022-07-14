import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityType } from '../ActivityType';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService {
  private apiUrl = 'http://localhost:9000/activity_types'

  constructor(private http: HttpClient) { }

  getActivityTypes(): Observable<ActivityType[]> {
    return this.http.get<ActivityType[]>(this.apiUrl)
  }
}
