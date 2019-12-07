import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/shared/organization.service';
import { Organization } from 'src/app/model/organization';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  organizations: Organization[] = [];

  organizationsDisplayColumns = ['name', 'description', 'email'];

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(o => {
      this.organizations = o;
    });
  }

}
