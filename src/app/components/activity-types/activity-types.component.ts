import { Component, OnInit } from '@angular/core';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { openCreateActivityType } from '../activity-type-create/activity-type-create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-activity-types',
  templateUrl: './activity-types.component.html',
  styleUrls: ['./activity-types.component.css']
})
export class ActivityTypesComponent implements OnInit {
  activityTypes: ActivityType[] = []
  
  constructor(private activityTypeService: ActivityTypeService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.activityTypeService.getActivityTypes().subscribe((resp) => resp.map(at => {
      at.photo = `../../../assets/${at.photo}`
      this.activityTypes.push(at)
    }))
  }

  createType(activityType: ActivityType) {
    openCreateActivityType(this.dialog, activityType)
  }

  editType() {

  }

  deleteType() {

  }

  close() {

  }

}
