import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityType } from 'src/app/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type.service';

@Component({
  selector: 'app-activity-type-edit',
  templateUrl: './activity-type-edit.component.html',
  styles: [
  ]
})
export class ActivityTypeEditComponent implements OnInit {
  selected = this.type.name

  constructor(
    @Inject(MAT_DIALOG_DATA) private type: ActivityType,
    private dialogRef: MatDialogRef<ActivityTypeEditComponent>,
    private activityTypeService: ActivityTypeService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

  save() {
    this.activityTypeService.updateActivityType(this.activityTypeForm.value).subscribe()
    this.dialogRef.close()
  }

  activityTypeForm = new FormGroup({
    name: new FormControl(this.type.name),
    photo: new FormControl(this.type.photo)
  })

}
