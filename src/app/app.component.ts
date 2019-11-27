import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationService } from './shared/organization.service';
import { Organization } from './model/organization';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';

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
    private userService: UserService,
    private router: Router) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(orgs => {
      this.organizations = orgs;
      if (orgs.length === 0) {
        console.log('create new org!')
      } else if (orgs.length >= 1) {
        const matched = window.location.pathname.match(/^\/organization\/([^\/]*)/)
        if (matched && matched.length == 2) {
          this.selected = orgs.find(o => o.name == matched[1]);
        }

        if (!this.selected) {
          this.selected = orgs[0];
        }

        if (!matched) {
          this.navigateToOrg();
        }
      }
    });

    this.userService.getCurrent().subscribe(u => {
      console.log(u);
    })
  }

  navigateToOrg(route?: string) {
    const r = ['organization', this.selected.name];
    if (route) {
      r.push(route);
    }
    this.router.navigate(r);
  }

  changeOrganization() {
    this.navigateToOrg();
  }
}
