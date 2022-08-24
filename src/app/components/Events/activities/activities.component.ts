import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/Activity';
import { SnackBarService } from 'src/app/services/snack-bar-service.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = []
  loading = false;
  

  constructor(private activityService: ActivityService,
              private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.loading = true;

    this.activityService.getActivities().subscribe({
      next: (resp) => this.activities = resp,
      error: () => {
        this.snackBarService.activityCreateError()
      },
      complete: () => this.loading = false
    })
  }
}
