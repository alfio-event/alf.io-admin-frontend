import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-edit-user-organization-dialog',
  templateUrl: './new-edit-user-organization-dialog.component.html'
})
export class NewEditUserOrganizationDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewEditUserOrganizationDialogComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.dialogRef.close();
  }
}
