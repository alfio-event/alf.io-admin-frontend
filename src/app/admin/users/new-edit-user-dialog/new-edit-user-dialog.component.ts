import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-edit-user-dialog',
  templateUrl: './new-edit-user-dialog.component.html'
})
export class NewEditUserDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewEditUserDialogComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.dialogRef.close();
  }

}
