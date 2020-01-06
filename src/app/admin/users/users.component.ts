import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User, Role, RoleDescriptor, UserType } from 'src/app/model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  usersDisplayColumns = ['enabled', 'username', 'name', 'organization', 'role'];

  rolesDescriptor$: Observable<{ [key in Role]?: RoleDescriptor }>

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.filter(u => u.type !== UserType.API_KEY);
    });
    this.rolesDescriptor$ = this.userService.getRolesDescriptor();
  }

}
