import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/shared/organization.service';
import { Organization } from 'src/app/model/organization';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewEditOrganizationDialogComponent } from './new-edit-organization-dialog/new-edit-organization-dialog.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  organizations: Organization[] = [];

  organizationsDisplayColumns = ['name', 'description', 'email', 'actions'];

  constructor(
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    ) { }

  ngOnInit() {

    if ('true' === this.route.snapshot.queryParams['new']) {
      this.newOrganization();
    }

    this.loadOrgs();
  }

  private loadOrgs() {
    this.organizationService.getOrganizations().subscribe(o => {
      this.organizations = o;
    });
  }

  edit(organization: Organization) {
    console.log('edit org', organization);
  }

  newOrganization() {
    this.dialog.open(NewEditOrganizationDialogComponent, { width: '600px' }).afterClosed().subscribe(o => {
      if (o) {
        this.router.navigate([]); //clear up the query params, if any
        this.loadOrgs();
      }
    });
  }

}
