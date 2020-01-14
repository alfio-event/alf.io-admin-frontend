import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-edit-group-dialog',
  templateUrl: './new-edit-group-dialog.component.html'
})
export class NewEditGroupDialogComponent implements OnInit {

  groupForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NewEditGroupDialogComponent>,
    private fb: FormBuilder
    ) {
      this.groupForm = fb.group({
        name: null,
        description: null,
        items: fb.array([
          fb.group({
            value: null,
            description: null,
            editable: true
          })
        ])
      });
    }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close();
  }

  addItem() {
    this.items.push(this.fb.group({value: null, description: null, editable: true}));
  }

  get items(): FormArray {
    return this.groupForm.get('items') as FormArray;
  }

  removeItem(idx: number) {
    this.items.removeAt(idx);
  }

}
