import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Activity } from 'src/app/Activity';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  activityForm = this.fb.group({
    type: ['', Validators.required],
    title: ['', [Validators.required, Validators.maxLength(30)]],
    date: [new Date(2022, 0, 1), Validators.required],
    location: ['', Validators.required],
    notes: ['']
  })

  constructor(private fb: FormBuilder, private activityService: ActivityService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.addActivity(this.activityForm.value)
    //redirect to home page
  }

  addActivity(activity: Activity) {
    this.activityService.addActivity(activity).subscribe()
  }

}
