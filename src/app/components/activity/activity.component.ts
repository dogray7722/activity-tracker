import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/Activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity

  constructor() { }

  ngOnInit(): void {
  }

}
