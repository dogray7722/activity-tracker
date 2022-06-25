import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Activity } from 'src/app/Activity';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog.open(EditActivityComponent)
  }

}
