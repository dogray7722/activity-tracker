import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarData } from 'src/app/SnackBarData';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) private snackBarData: SnackBarData) { }
  message = this.snackBarData.message
  wasSuccessful = this.snackBarData.wasSuccessful
}