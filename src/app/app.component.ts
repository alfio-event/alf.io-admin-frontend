import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationService } from './shared/organization.service';
import { Organization } from './model/organization';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';
import { UserInfo } from './model/user';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfigurationService } from './shared/configuration.service';
import { OrganizationSelectDialogComponent } from './organization-select-dialog/organization-select-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  organizations: Organization[];
  selected: Organization;
  userInfo: UserInfo;

  constructor(
    translate: TranslateService, 
    private organizationService: OrganizationService,
    private userService: UserService,
    private configurationService: ConfigurationService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(orgs => {
      this.organizations = orgs;
      if (orgs.length === 0) {
        this.snackBar.open('No organizations found', 'Create a new one').onAction().subscribe(() => {
          console.log('navigate to organization creation')
        });
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
      this.userInfo = u;
    });

    this.configurationService.isBasicConfigurationNeeded().subscribe(res => {
      console.log('basic conf needed:', res);
    })
  }

  openOrganizationSelector() {
    const currentOrgId = this.selected ? this.selected.id : undefined;
    this.dialog.open(OrganizationSelectDialogComponent, {width: '600px', data: { currentOrgId: currentOrgId}}).afterClosed().subscribe((res: Organization) => {
      if (res) {
        this.selected = res;
        this.navigateToOrg();
      }
    });
  }

  navigateToOrg(route?: string) {
    const r = ['organization', this.selected.name];
    if (route) {
      r.push(route);
    }
    this.router.navigate(r);
  }
}
