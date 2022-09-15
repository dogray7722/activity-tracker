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

  getActivity(id: string) {
    return this.http.get<Activity>(`${this.baseUrl}/${id}.json`
    + '?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkMjNmMzc0MDI1ZWQzNTNmOTg0YjUxMWE3Y2NlNDlhMzFkMzFiZDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWN0aXZpdHl0cmFja2VyLTIxMjQ3IiwiYXVkIjoiYWN0aXZpdHl0cmFja2VyLTIxMjQ3IiwiYXV0aF90aW1lIjoxNjYzMjA2OTAzLCJ1c2VyX2lkIjoiTEswZTZ1WUFVY1FNcE9hMm53SmFuN1liR2l4MSIsInN1YiI6IkxLMGU2dVlBVWNRTXBPYTJud0phbjdZYkdpeDEiLCJpYXQiOjE2NjMyMDY5MDMsImV4cCI6MTY2MzIxMDUwMywiZW1haWwiOiJkb2dyYXk3N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZG9ncmF5NzdAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.QGn-LR9E8K-3oqUCGSgj4s4jY8ZjH4cZYsxCamLyn0aT4pJq1CTqS3jm3d70I0HCeKGaL0QiCLNkBIAuyC0x9WfGoDuaNNNEyY8QJ39ZC9uk_NL9GJonnAhgN1oFxH_4dfs96oWycx_2wvDO0EpKisrfCaJOksuBLt_H24Mtk_Sshmq5N_jQCQSOYVL-tDOCKhui8jP0v9P2SVF-X6SSTBKOyhJPMDJQfeXXtcbqCbUCo6p4QPtjhZwsiXrRhbfRgnhAImHMvtHJG2KW00RltVpLM4zeB9xlfeTFE262OoDcjL1vfqolWJwMu-e-U6wJIcP0jc6Js3GO9ZQ3_u-8ug').pipe(
      tap((res) => {
        console.log(res)
      }),
      catchError((error) => {
        this.snackBarService.snackBarMessage(false, "getActivityError")
        return throwError(() => new Error(error))
      })
    )
  }
  
  getActivities() {
    return this.http.get<{ [key: string]: Activity }>(`${this.baseUrl}.json`).pipe(
      tap(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.userId = userData.id
      }),
      map(responseData => {
        const activities: Activity[] = []
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key) && this.userId == responseData[key].userId) {
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
      catchError(() => {
        this.snackBarService.snackBarMessage(false, "createActivityError")
        return EMPTY
      })
    ).subscribe(() => {
      this.snackBarService.snackBarMessage(true, "createActivitySuccess")
    })
  }

  putActivity(activity: Activity) {
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
