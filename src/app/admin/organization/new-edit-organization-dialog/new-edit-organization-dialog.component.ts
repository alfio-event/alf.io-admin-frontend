import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OrganizationService } from 'src/app/shared/organization.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-edit-organization-dialog',
  templateUrl: './new-edit-organization-dialog.component.html'
})
export class NewEditOrganizationDialogComponent implements OnInit {

  newOrgForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NewEditOrganizationDialogComponent>,
    private organizationService: OrganizationService,
    fb: FormBuilder
  ) { 
    this.newOrgForm = fb.group({
      name: null,
      email: null,
      description: null
    });
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
    })
  }

}
