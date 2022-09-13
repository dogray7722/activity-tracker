import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/Activity';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { pipe, map, finalize } from 'rxjs';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = []
  activityTypes: ActivityType[] = []
  loading = false;
  typePhoto: string;
  
  constructor(private activityService: ActivityService,
              private activityTypeService: ActivityTypeService) { }

  ngOnInit(): void {
    this.loading = true;
    this.activityTypeService.getActivityTypes().pipe(
      finalize(() => {
        this.activityService.getActivities().pipe(
          map(
            res => {
              const newResults: Activity[] = []
              for (const act of res) {
                let temp = this.activityTypes.find(type => type.name === act.type)
                if (temp.photo) {
                  act.typePhoto = temp.photo
                  newResults.push(act)
                }
              }
              this.activities = newResults
            }
          )
        ).subscribe({
            next: () => this.loading = false,
            error: () => this.loading = false  
          }) 
      })
    ).subscribe({
        next: res => {
          this.loading = true
          this.activityTypes = res
        },
        error: () => {
          this.loading = false
        }
      })
    }
  }
    