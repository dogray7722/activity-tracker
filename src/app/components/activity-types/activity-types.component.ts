import { Component, OnInit } from '@angular/core';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';

@Component({
  selector: 'app-activity-types',
  templateUrl: './activity-types.component.html',
  styleUrls: ['./activity-types.component.css']
})
export class ActivityTypesComponent implements OnInit {
  activityTypes: ActivityType[] = []
  types = []
  
  constructor(private activityTypeService: ActivityTypeService) { }

  ngOnInit(): void {
    this.activityTypeService.getActivityTypes().subscribe(resp => this.activityTypes = resp)
  }

}
