import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../shared/organization.service';
import { Organization } from '../model/organization';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  organizations: Organization[] = [];

  organizationsDisplayColumns = ['name', 'description', 'email'];

  constructor(
    private organizationService: OrganizationService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    const orgName = this.route.snapshot.paramMap.get('org');

    this.organizationService.getOrganization(orgName).subscribe(orgs => {
      this.organizations = orgs;
    });
  }

}
