import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User, Role, RoleDescriptor } from '../model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss']
})
export class ApiKeysComponent implements OnInit {

  apiKeys: User[];
  apiKeysDisplayColumns = ['enabled', 'apiKey', 'description', 'role', 'memberOf'];

  rolesDescriptor$: Observable<{[key in Role]?: RoleDescriptor}>


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getApiKeys().subscribe(apiKeys => {
      this.apiKeys = apiKeys;
    });
    this.rolesDescriptor$ = this.userService.getRolesDescriptor();
  }

}
