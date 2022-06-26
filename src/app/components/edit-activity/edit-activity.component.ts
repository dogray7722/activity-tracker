import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditActivityComponent>) { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    type: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    date: new FormControl(''),
    notes: new FormControl('')
  });

}
