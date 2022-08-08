import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  
  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private completed: number)
     { }

  ngOnInit(): void {
  }

}

export function showProgressSpinner(dialog: MatDialog, completed: number) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.panelClass = 'transparent';
  dialogConfig.disableClose = true;
  dialogConfig.width = "40%";
  dialogConfig.data = {
    completed
  }
  const dialogRef = dialog.open(SpinnerComponent, dialogConfig)
  return dialogRef.afterClosed();
}
