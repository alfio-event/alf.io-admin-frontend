import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrganizationService } from 'src/app/shared/organization.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Organization } from 'src/app/model/organization';

@Component({
  selector: 'app-new-edit-organization-dialog',
  templateUrl: './new-edit-organization-dialog.component.html'
})
export class NewEditOrganizationDialogComponent implements OnInit {

  newOrgForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public orgToEdit: Organization,
    private dialogRef: MatDialogRef<NewEditOrganizationDialogComponent>,
    private organizationService: OrganizationService,
    fb: FormBuilder
  ) {

    console.log(orgToEdit)

    let fg = {id: null, name: null, email: null, description: null};
    if (orgToEdit) {
      fg.name = [orgToEdit.name];
      fg.email = [orgToEdit.email];
      fg.description = [orgToEdit.description];
      fg.id = [orgToEdit.id];
    }

    this.newOrgForm = fb.group(fg);
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.organizationService.createNew(this.newOrgForm.value).subscribe(res => {
      if (res === 'OK') {
        this.dialogRef.close(true);
      }
    });
  }

  update() {
    this.organizationService.update(this.newOrgForm.value).subscribe(res => {
      if (res === 'OK') {
        this.dialogRef.close(true);
      }
    });
  }

}
