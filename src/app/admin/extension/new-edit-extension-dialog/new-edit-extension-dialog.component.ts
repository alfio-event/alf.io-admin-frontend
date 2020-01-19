import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExtensionSupport } from 'src/app/model/extension';

@Component({
  selector: 'app-new-edit-extension-dialog',
  templateUrl: './new-edit-extension-dialog.component.html'
})
export class NewEditExtensionDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public extensionToEdit: ExtensionSupport,
    private dialogRef: MatDialogRef<NewEditExtensionDialogComponent>,) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.dialogRef.close();
  }

  update() {
    this.dialogRef.close();
  }
}
