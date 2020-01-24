import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
  orgIdMapping: {[key: number]: string} = {};
  pathToIds: {[key: string]: {type: string, orgId: number, eventId: number}} = {};

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
      let mapping = {};
      extensions.forEach(e => {
        mapping[e.path] = fromPathToOrgAndEventId(e.path);
      });
      this.pathToIds = mapping;
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

export function fromPathToOrgAndEventId(path: string): {orgId: number, eventId: number, type: string} {
  let splitted = path.split('-').slice(1); // we have 3 possibilities: [''], ['1'] or ['1', '1']
  if (splitted.length === 1 && splitted[0] === '') {
    return {type: 'SYSTEM', orgId: undefined, eventId: undefined}; // system level
  } else if (splitted.length === 1 && splitted[0] !== '') {
    return {type: 'ORGANIZATION', orgId: parseInt(splitted[0], 10), eventId: undefined};
  } else if (splitted.length === 2) {
    return {type: 'EVENT', orgId: parseInt(splitted[0], 10), eventId: parseInt(splitted[1], 10)};
  } else {
    throw 'Wrong path format';
  }
}

@Pipe({name: 'pathToOrgAndEvent', pure: true})
export class PathToOrgAndEventPipe implements PipeTransform {
  transform(value: {orgId: number, eventId: number, type: string}, orgIdMapping: {[key: number]: string}) {
    let orgName = orgIdMapping[value.orgId];
    if (value.type === 'SYSTEM') {
      return 'System';
    } else if (orgName && value.type === 'ORGANIZATION') {
      return 'System > ' + orgName;
    } else if (orgName && value.type === 'EVENT') {
      return 'System > ' + orgName + ' > EVENT TODO';
    }
  }
}