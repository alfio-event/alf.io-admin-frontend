import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { OrganizationService } from '../shared/organization.service';
import { Organization } from '../model/organization';
import { MatDialogRef, MatTableDataSource, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
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

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OrganizationSelectDialogComponent>,
    private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(orgs => {
      this.organizations = new MatTableDataSource<Organization>(orgs);
      this.organizations.paginator = this.paginator;

      const currentOrg = orgs.find(o => this.data.currentOrgId === o.id);
      const selectionModel = currentOrg ? [currentOrg] : [];
      this.selection = new SelectionModel<Organization>(false, selectionModel);
    });
  }

  selectOrg(org: Organization) {
    this.dialogRef.close(org);
  }

  cancel() {
    this.dialogRef.close();
  }
}
