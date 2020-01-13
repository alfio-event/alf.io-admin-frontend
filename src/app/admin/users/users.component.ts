import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User, Role, RoleDescriptor, UserType, RoleTarget } from 'src/app/model/user';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { NewEditUserDialogComponent } from '../../dialog/new-edit-user-dialog/new-edit-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  usersDisplayColumns = ['enabled', 'username', 'name', 'organization', 'role', 'actions'];

  rolesDescriptor$: Observable<{ [key in Role]?: RoleDescriptor }>

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadUsers();
    this.rolesDescriptor$ = this.userService.getRolesDescriptor(RoleTarget.USER);
  }

  private loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.filter(u => u.type !== UserType.API_KEY);
    });
  }

  deleteUser(user: User) {
    let msg = 'The user ' + user.username + ' will be deleted. Are you sure?';
    this.dialog.open(ConfirmDialogComponent, {width: '400px', data: {title: 'Confirm deletion', message: msg}}).afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteUser(user).subscribe(res => {
          this.loadUsers();
        })
      }
    });
  }

  toggleVisibility(user: User) {
    this.userService.toggleUser(user).subscribe(res => {
      if (res) {
        this.loadUsers();
      }
    });
  }

  newUser() {
    this.dialog.open(NewEditUserDialogComponent, { width: '600px' }).afterClosed().subscribe(o => {
      if (o) {
        this.loadUsers();
      }
    });
  }

  editUser(user: User) {
    this.dialog.open(NewEditUserDialogComponent, { width: '600px', data: { user: user }}).afterClosed().subscribe(o => {
      if (o) {
        this.loadUsers();
      }
    });
  }

}
