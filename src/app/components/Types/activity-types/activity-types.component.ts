import { Component, OnInit } from '@angular/core';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { openCreateActivityType } from '../activity-type-create/activity-type-create.component';
import { MatDialog } from '@angular/material/dialog';
import { openDeleteActivityType } from '../activity-type-delete/activity-type-delete.component';
import { openEditActivityType } from '../activity-type-edit/activity-type-edit.component';

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
    this.activityTypeService.getActivityTypes().subscribe(
      (resp) => this.activityTypes = resp)
  }

  createType() {
    openCreateActivityType(this.dialog)
  }

  editType(type: ActivityType) {
    openEditActivityType(this.dialog, type)
  }

  deleteType(type: ActivityType) {
    openDeleteActivityType(this.dialog, type)
  }
}