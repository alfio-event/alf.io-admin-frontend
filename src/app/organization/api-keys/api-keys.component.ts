import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User, Role, RoleDescriptor, RoleTarget } from '../../model/user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewEditApiKeyDialogComponent } from './new-edit-api-key-dialog/new-edit-api-key-dialog.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html'
})
export class ApiKeysComponent implements OnInit {

  apiKeys: User[];
  apiKeysDisplayColumns = ['enabled', 'apiKey', 'description', 'role', 'actions'];

  rolesDescriptor$: Observable<{ [key in Role]?: RoleDescriptor }>


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.loadApiKeys();

    this.rolesDescriptor$ = this.userService.getRolesDescriptor(RoleTarget.API_KEY);
  }

  private getOrganizationName(): string {
    return this.route.snapshot.paramMap.get('org');
  }

  private loadApiKeys() {
    this.userService.getApiKeys(this.getOrganizationName()).subscribe(apiKeys => {
      this.apiKeys = apiKeys;
    });
  }

  newApiKey(): void {
    this.dialog.open(NewEditApiKeyDialogComponent, { width: '600px', data: { organizationName: this.getOrganizationName()} }).afterClosed().subscribe(o => {
      if (o) {
        this.loadApiKeys();
      }
    });
  }

  toggleVisibility(apiKey: User) {
    this.userService.toggleUser(apiKey).subscribe(res => {
      if (res) {
        this.loadApiKeys();
      }
    });
  }

  editApiKey(apiKey: User) {
    this.dialog.open(NewEditApiKeyDialogComponent, { width: '600px', data: { organizationName: this.getOrganizationName(), apiKey: apiKey }}).afterClosed().subscribe(o => {
      if (o) {
        this.loadApiKeys();
      }
    });
  }

  deleteApiKey(apiKey: User) {
    let msg = 'The api key ' + apiKey.username + ' will be deleted. Are you sure?';
    this.dialog.open(ConfirmDialogComponent, {width: '400px', data: {title: 'Confirm deletion', message: msg}}).afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteUser(apiKey).subscribe(res => {
          this.loadApiKeys();
        })
      }
    });
  }

}
