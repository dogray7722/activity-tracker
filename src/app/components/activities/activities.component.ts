import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/Activity';
import { catchError, finalize, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = []
  loading = false;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.loading = true;

    this.activityService.getActivities()
    .pipe(
      tap((resp) => this.activities = resp),
      catchError(err => {
        alert("Error loading activities.");
        return throwError(() => err)
      }),
      finalize(() => this.loading = false)
    )
    .subscribe()
  }

  addActivity(activity: Activity) {
    this.activityService.addActivity(activity).subscribe((act) => this.activities.push(act))
  }

}
