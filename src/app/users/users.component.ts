import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User, RoleDescriptor, Role } from '../model/user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  usersDisplayColumns = ['enabled', 'username', 'name', 'role', 'memberOf'];

  rolesDescriptor$: Observable<{[key in Role]?: RoleDescriptor}>

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    const orgName = this.route.snapshot.paramMap.get('org');

    this.userService.getUsers(orgName).subscribe(users => {
      this.users = users;
    });
    this.rolesDescriptor$ = this.userService.getRolesDescriptor();
  }

}
