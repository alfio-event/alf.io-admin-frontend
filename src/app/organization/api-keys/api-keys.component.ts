import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User, Role, RoleDescriptor } from '../../model/user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss']
})
export class ApiKeysComponent implements OnInit {

  apiKeys: User[];
  apiKeysDisplayColumns = ['enabled', 'apiKey', 'description', 'role'];

  rolesDescriptor$: Observable<{[key in Role]?: RoleDescriptor}>


  constructor(
    private userService: UserService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    const orgName = this.route.snapshot.paramMap.get('org');

    this.userService.getApiKeys(orgName).subscribe(apiKeys => {
      this.apiKeys = apiKeys;
    });
    this.rolesDescriptor$ = this.userService.getRolesDescriptor();
  }

}
