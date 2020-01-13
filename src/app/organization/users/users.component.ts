import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User, RoleDescriptor, Role, RoleTarget } from '../../model/user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewEditUserDialogComponent } from '../../dialog/new-edit-user-dialog/new-edit-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  usersDisplayColumns = ['enabled', 'username', 'name', 'role'];
  organizationName: string;

  rolesDescriptor$: Observable<{ [key in Role]?: RoleDescriptor }>

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.organizationName = this.route.snapshot.paramMap.get('org')
    this.loadUsers();
    this.rolesDescriptor$ = this.userService.getRolesDescriptor(RoleTarget.USER);
  }

  private loadUsers() {
    this.userService.getUsers(this.organizationName).subscribe(users => {
      this.users = users;
    });
  }

  newUser() {
    this.dialog.open(NewEditUserDialogComponent, { width: '600px' , data: {organizationName: this.organizationName}}).afterClosed().subscribe(o => {
      if (o) {
        this.loadUsers();
      }
    });
  }

}
