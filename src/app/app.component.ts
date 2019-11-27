import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationService } from './shared/organization.service';
import { Organization } from './model/organization';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  organizations: Organization[];
  selected: Organization;

  constructor(
    translate: TranslateService, 
    private organizationService: OrganizationService,
    private router: Router) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(orgs => {
      this.organizations = orgs;
      if (orgs.length === 0) {
        console.log('create new org!')
      } else if (orgs.length >= 1) {
        this.selected = orgs[0];
        this.router.navigate([this.selected.name], {replaceUrl: true});
      }
    });
  }

  navigateTo(route?: string) {
    const r = [this.selected.name];
    if (route) {
      r.push(route);
    }
    this.router.navigate(r);
  }

  changeOrganization() {
    console.log('change')
    this.navigateTo();
  }
}
