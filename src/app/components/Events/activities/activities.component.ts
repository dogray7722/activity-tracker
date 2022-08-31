import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/Activity';

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
    this.activityService.getActivities().subscribe(
      res => {
        this.loading = false
        this.activities = res
      }
    )  
  }
}
