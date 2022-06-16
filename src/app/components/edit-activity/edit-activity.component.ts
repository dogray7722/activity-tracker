import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}

export function openEditActivityDialog(dialog: MatDialog, activity: Activity) {
  const config = new MatDialogConfig();

  config.disableClose = true
  config.data = {
    ...activity
  }

  const dialogRef = dialog.open(EditActivityComponent, config)
  return dialogRef.close()
}
