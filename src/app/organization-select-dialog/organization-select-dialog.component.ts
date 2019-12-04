import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../shared/organization.service';
import { Organization } from '../model/organization';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-organization-select-dialog',
  templateUrl: './organization-select-dialog.component.html',
  styleUrls: ['./organization-select-dialog.component.scss']
})
export class OrganizationSelectDialogComponent implements OnInit {

  organizations: Organization[];

  orgDisplayColumns = ['name', 'email'];

  constructor(private dialogRef: MatDialogRef<OrganizationSelectDialogComponent>, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(orgs => {
      this.organizations = orgs;
    });
  }

  selectOrg(org: Organization) {
    this.dialogRef.close(org);
  }

  cancel() {
    this.dialogRef.close();
  }

}
