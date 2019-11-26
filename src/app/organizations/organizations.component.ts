import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../shared/organization.service';
import { Organization } from '../model/organization';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  organizations: Organization[] = [];

  organizationsDisplayColumns = ['name', 'description', 'email'];

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(orgs => {
      this.organizations = orgs;
    });
  }

}
