import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User, RoleDescriptor, Role } from '../../model/user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewEditUserOrganizationDialogComponent } from './new-edit-user-organization-dialog/new-edit-user-organization-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  usersDisplayColumns = ['enabled', 'username', 'name', 'role'];

  rolesDescriptor$: Observable<{ [key in Role]?: RoleDescriptor }>

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.rolesDescriptor$ = this.userService.getRolesDescriptor();
  }

  private loadUsers() {
    this.userService.getUsers(this.route.snapshot.paramMap.get('org')).subscribe(users => {
      this.users = users;
    });
  }

  newUser() {
    this.dialog.open(NewEditUserOrganizationDialogComponent, { width: '600px' }).afterClosed().subscribe(o => {
      if (o) {
        this.loadUsers();
      }
    });
  }

}
