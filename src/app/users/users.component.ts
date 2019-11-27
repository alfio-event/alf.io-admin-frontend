import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User, RoleDescriptor, Role } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  usersDisplayColumns = ['enabled', 'username', 'name', 'role', 'memberOf'];

  rolesDescriptor$: Observable<{[key in Role]?: RoleDescriptor}>

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.rolesDescriptor$ = this.userService.getRolesDescriptor().pipe(map(roleDesc => {
      const res: {[key in Role]?: RoleDescriptor} = {};
      roleDesc.forEach((roleDesc) => {
        res[roleDesc.role] = roleDesc;
      });
      return res;
    }));
  }

}
