import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/shared/organization.service';
import { Organization } from 'src/app/model/organization';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    if ('true' === this.route.snapshot.queryParams['new']) {
      this.newOrganization();
    }

    this.organizationService.getOrganizations().subscribe(o => {
      this.organizations = o;
    });
  }

  newOrganization() {
    console.log('open new org dialog')
  }

}
