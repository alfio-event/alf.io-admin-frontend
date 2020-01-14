import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { GroupService } from 'src/app/shared/group.service';

@Component({
  selector: 'app-new-edit-group-dialog',
  templateUrl: './new-edit-group-dialog.component.html'
})
export class NewEditGroupDialogComponent implements OnInit {

  groupForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {organizationName: string},
    private dialogRef: MatDialogRef<NewEditGroupDialogComponent>,
    private fb: FormBuilder,
    private groupService: GroupService
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
    this.groupService.create(this.data.organizationName, this.groupForm.value).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
      }
    })
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
