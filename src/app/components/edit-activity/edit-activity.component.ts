import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditActivityComponent>) { }

  ngOnInit(): void {
  }

  form = this.fb.group({
    type: ['', Validators.required],
    title: ['', Validators.required],
    location: ['', Validators.required],
    date: [new Date(), Validators.required],
    notes: [""]
  })

}
