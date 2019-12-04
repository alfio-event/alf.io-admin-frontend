import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '../shared/organization.service';
import { Organization } from '../model/organization';
import { MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-organization-select-dialog',
  templateUrl: './organization-select-dialog.component.html',
  styleUrls: ['./organization-select-dialog.component.scss']
})
export class OrganizationSelectDialogComponent implements OnInit {

  organizations: MatTableDataSource<Organization>;
  selection: SelectionModel<Organization>;

  orgDisplayColumns = ['selection', 'name', 'email'];

  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;

  constructor(private dialogRef: MatDialogRef<OrganizationSelectDialogComponent>, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(orgs => {
      this.organizations = new MatTableDataSource<Organization>(orgs);
      this.organizations.paginator = this.paginator;
      this.selection = new SelectionModel<Organization>(false, []);
    });
  }

  selectOrg(org: Organization) {
    this.dialogRef.close(org);
  }

  cancel() {
    this.dialogRef.close();
  }
}
