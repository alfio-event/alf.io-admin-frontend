import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationService } from './shared/organization.service';
import { Organization } from './model/organization';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';
import { UserInfo } from './model/user';
import { MatSnackBar, MatDialog, MatIconRegistry } from '@angular/material';
import { ConfigurationService } from './shared/configuration.service';
import { OrganizationSelectDialogComponent } from './organization-select-dialog/organization-select-dialog.component';
import { BasicConfigurationDialogComponent } from './basic-configuration-dialog/basic-configuration-dialog.component';
import { business, arrow_drop_down, search, add, person, edit }  from './icons';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  organizations: Organization[];
  selected: Organization;
  userInfo: UserInfo;

  private orgChangedSub: Subscription;

  constructor(
    translate: TranslateService,
    private organizationService: OrganizationService,
    private userService: UserService,
    private configurationService: ConfigurationService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    translate.setDefaultLang('en');

    iconRegistry.addSvgIconLiteral('business', sanitizer.bypassSecurityTrustHtml(business));
    iconRegistry.addSvgIconLiteral('arrow_drop_down', sanitizer.bypassSecurityTrustHtml(arrow_drop_down));
    iconRegistry.addSvgIconLiteral('search', sanitizer.bypassSecurityTrustHtml(search));
    iconRegistry.addSvgIconLiteral('add', sanitizer.bypassSecurityTrustHtml(add));
    iconRegistry.addSvgIconLiteral('person', sanitizer.bypassSecurityTrustHtml(person));
    iconRegistry.addSvgIconLiteral('edit', sanitizer.bypassSecurityTrustHtml(edit));
  }

  ngOnInit() {
    
    this.organizationService.getOrganizations().subscribe(orgs => {
      const currentUrl = this.router.url;
      this.organizations = orgs;
      if (orgs.length === 0 && !currentUrl.startsWith('/admin/organization')) {
        this.snackBar.open('No organizations found', 'Create a new one').onAction().subscribe(() => {
          this.router.navigate(['admin', 'organization'], { queryParams: { new: 'true' } })
        });
      } else if (orgs.length >= 1) {
        const matched = currentUrl.match(/^\/organization\/([^\/]*)/)
        if (matched && matched.length == 2) {
          this.selected = orgs.find(o => o.name == matched[1]);
        }

        if (!this.selected) {
          this.selected = orgs[0];
        }

        if (currentUrl.match(/^\/admin\/.*$/)) {
          return;
        } else if (!matched) {
          this.navigateToOrg();
        }
      }
    });

    this.userService.getCurrent().subscribe(u => {
      this.userInfo = u;
    });

    this.configurationService.isBasicConfigurationNeeded().subscribe(res => {
      if (res) {
        this.dialog.open(BasicConfigurationDialogComponent, { width: '80%' });
      }
    });

    this.orgChangedSub = this.organizationService.organizationChanged.subscribe(orgChanges => {
      this.organizationService.getOrganizations().subscribe(orgs => {
        this.organizations = orgs;
        //
        if (this.selected) {
          this.selected = this.organizations.find(org => org.id === this.selected.id);
        } else {
          this.selected = this.organizations[0];
        }
      });
    });
  }

  ngOnDestroy() {
    this.orgChangedSub.unsubscribe();
  }

  openOrganizationSelector() {
    const currentOrgId = this.selected ? this.selected.id : undefined;
    this.dialog.open(OrganizationSelectDialogComponent, { width: '600px', data: { currentOrgId: currentOrgId } }).afterClosed().subscribe((res: Organization) => {
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
