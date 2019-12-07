import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/shared/organization.service';
import { Organization } from 'src/app/model/organization';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewOrganizationDialogComponent } from './new-organization-dialog/new-organization-dialog.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  organizations: Organization[] = [];

  organizationsDisplayColumns = ['name', 'description', 'email'];

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

  newOrganization() {
    this.dialog.open(NewOrganizationDialogComponent, { width: '600px' }).afterClosed().subscribe(o => {
      if (o) {
        this.router.navigate([]); //clear up the query params, if any
        this.loadOrgs();
      }
    });
  }

}
