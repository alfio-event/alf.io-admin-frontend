import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User, Role, RoleDescriptor } from '../../model/user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewEditApiKeyDialogComponent } from './new-edit-api-key-dialog/new-edit-api-key-dialog.component';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html'
})
export class ApiKeysComponent implements OnInit {

  apiKeys: User[];
  apiKeysDisplayColumns = ['enabled', 'apiKey', 'description', 'role'];

  rolesDescriptor$: Observable<{ [key in Role]?: RoleDescriptor }>


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.loadApiKeys();

    this.rolesDescriptor$ = this.userService.getRolesDescriptor();
  }

  private loadApiKeys() {
    const orgName = this.route.snapshot.paramMap.get('org');
    this.userService.getApiKeys(orgName).subscribe(apiKeys => {
      this.apiKeys = apiKeys;
    });
  }

  newApiKey(): void {
    this.dialog.open(NewEditApiKeyDialogComponent, { width: '600px', data: null }).afterClosed().subscribe(o => {
      
    });
  }

}
