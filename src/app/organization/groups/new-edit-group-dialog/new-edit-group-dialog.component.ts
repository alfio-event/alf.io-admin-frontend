import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-edit-group-dialog',
  templateUrl: './new-edit-group-dialog.component.html'
})
export class NewEditGroupDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewEditGroupDialogComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close();
  }

}
