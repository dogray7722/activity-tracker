import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Activity } from 'src/app/Activity';
import { ActivityService } from 'src/app/services/activity.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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

  constructor(private fb: FormBuilder, 
              private activityService: ActivityService,
              private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const body = this.activityForm.value
    body.date = this.datePipe.transform(body.date, 'mediumDate')
    this.addActivity(body)
    this.router.navigate(['/'])
  }

  addActivity(activity: Activity) {
    this.activityService.addActivity(activity).subscribe()
  }

}
