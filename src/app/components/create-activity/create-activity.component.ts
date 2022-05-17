import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
