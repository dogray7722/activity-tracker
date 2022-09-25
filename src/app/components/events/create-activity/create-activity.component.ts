import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Activity } from 'src/app/Activity';
import { ActivityService } from 'src/app/services/activity.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { ActivityType } from 'src/app/ActivityType';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})

export class CreateActivityComponent implements OnInit {
  activityTypes: ActivityType[] = [];
  
  constructor(private fb: UntypedFormBuilder, 
              private activityService: ActivityService,
              private activityTypeService: ActivityTypeService,
              private router: Router, 
              private datePipe: DatePipe,
              private authService: AuthService
              ) { }

  activityForm = this.fb.group({
    type: ['', Validators.required],
    title: ['', [Validators.required, Validators.maxLength(30)]],
    date: [new Date(2022, 0, 1), Validators.required],
    location: ['', Validators.required],
    notes: ['', Validators.maxLength(500)]
  })

  ngOnInit(): void {
    this.activityTypeService.getActivityTypes().subscribe(resp => this.activityTypes = resp)
  }

  onSubmit() {
    const body = this.activityForm.value
    body.date = this.datePipe.transform(body.date, 'mediumDate')
    this.authService.user.subscribe(res => 
      body.userId = res.id
    )
    
    this.addActivity(body)
    setTimeout(() => {
      this.router.navigate(['/events'])
    }, 500);
  }

  addActivity(activity: Activity) {
    this.activityService.addActivity(activity)
  }
}