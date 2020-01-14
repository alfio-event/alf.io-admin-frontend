import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { GroupService } from 'src/app/shared/group.service';
import { GroupWithDetails } from 'src/app/model/group';

@Component({
  selector: 'app-new-edit-group-dialog',
  templateUrl: './new-edit-group-dialog.component.html'
})
export class NewEditGroupDialogComponent implements OnInit {

  groupForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {organizationName: string, group: GroupWithDetails},
    private dialogRef: MatDialogRef<NewEditGroupDialogComponent>,
    private fb: FormBuilder,
    private groupService: GroupService
    ) {
      this.groupForm = fb.group({
        name: null,
        description: null,
        items: fb.array([
        ])
      });

      if (data.group) {
        this.groupForm.patchValue({id: data.group.id, name: data.group.name, description: data.group.description});
        data.group.items.forEach(gi => {
          this.items.push(fb.group({id: gi.id, value: gi.value, description: gi.description}));
        });
      } else {
        this.items.push(fb.group({
          value: null,
          description: null,
          editable: true
        }))
      }
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

  update() {

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
