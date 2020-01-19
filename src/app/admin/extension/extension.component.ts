import { Component, OnInit } from '@angular/core';
import { ExtensionService } from 'src/app/shared/extension.service';
import { ExtensionSupport } from 'src/app/model/extension';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { NewEditExtensionDialogComponent } from './new-edit-extension-dialog/new-edit-extension-dialog.component';
import { OrganizationService } from 'src/app/shared/organization.service';
import { Organization } from 'src/app/model/organization';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html'
})
export class ExtensionComponent implements OnInit {

  extensions: ExtensionSupport[] = [];
  organizations: Organization[] = [];
  orgIdMapping: {[key: number]: string};

  extensionsDisplayColumns = ['path', 'name', 'enabled', 'actions'];

  constructor(
    organizationService: OrganizationService,
    private extensionService: ExtensionService,
    private dialog: MatDialog) {
    this.loadExtensions();
    organizationService.getOrganizations().subscribe(orgs => {
      this.organizations = orgs;
      let orgIdMapping: {[key: number]: string} = {};
      orgs.forEach(o => {
        orgIdMapping[o.id] = o.name;
      });
      this.orgIdMapping = orgIdMapping;
    });
  }

  ngOnInit() {
  }

  private loadExtensions() {
    this.extensionService.getExtensions().subscribe(extensions => {
      this.extensions = extensions;
    });
  }

  newExtension() {
    this.dialog.open(NewEditExtensionDialogComponent, { width: '1024px' }).afterClosed().subscribe(o => {
      if (o) {
        this.loadExtensions();
      }
    });
  }

  editExtension(extension: ExtensionSupport) {
    this.dialog.open(NewEditExtensionDialogComponent, { width: '1024px', data: extension }).afterClosed().subscribe(o => {
      if (o) {
        this.loadExtensions();
      }
    });
  }

  deleteExtension(extension: ExtensionSupport) {
    let msg = 'The extension ' + extension.name + ' will be deleted. Are you sure?';
    this.dialog.open(ConfirmDialogComponent, {width: '400px', data: {title: 'Confirm deletion', message: msg}}).afterClosed().subscribe(res => {
      if (res) {
        this.extensionService.deleteExtension(extension).subscribe(res => {
          this.loadExtensions();
        })
      }
    });
  }
}
