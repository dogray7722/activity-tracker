import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Activity } from 'src/app/Activity';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  form = this.fb.group({
    type: ['', Validators.required],
    title: ['', [Validators.required, Validators.maxLength(30)]],
    date: [new Date(2022, 0, 1), Validators.required],
    location: ['', Validators.required],
    notes: ['']
  })

  @Output() onAddActivity: EventEmitter<Activity> = new EventEmitter

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newActivity = {
      type: this.form.value('type'),
      title: this.form.value('title'),
      date: this.form.value('date'),
      location: this.form.value('location'),
      notes: this.form.value('notes')
    }

    this.onAddActivity.emit(newActivity)

  }



}
