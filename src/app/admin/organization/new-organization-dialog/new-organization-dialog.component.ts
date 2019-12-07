import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OrganizationService } from 'src/app/shared/organization.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-organization-dialog',
  templateUrl: './new-organization-dialog.component.html',
  styleUrls: ['./new-organization-dialog.component.scss']
})
export class NewOrganizationDialogComponent implements OnInit {

  newOrgForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NewOrganizationDialogComponent>,
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
