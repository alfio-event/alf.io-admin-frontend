import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/shared/organization.service';
import { Organization } from 'src/app/model/organization';
import { UserService } from 'src/app/shared/user.service';
import { Role, RoleDescriptor, RoleTarget, User } from 'src/app/model/user';

@Component({
  selector: 'app-new-edit-user-dialog',
  templateUrl: './new-edit-user-dialog.component.html'
})
export class NewEditUserDialogComponent implements OnInit {

  userForm: FormGroup;

  organizations: Organization[] = [];
  roleDescriptionMap: { [key in Role]?: RoleDescriptor };
  roles: Role[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
    private dialogRef: MatDialogRef<NewEditUserDialogComponent>,
    private organizationService: OrganizationService,
    private userService: UserService,
    fb: FormBuilder
    ) {
      this.userForm = fb.group({
        organization: null,
        role: null,
        username: null,
        firstName: null,
        lastName: null,
        email: null
      });

      if (data && data.user) {
        this.userForm.patchValue({
          organization: data.user.memberOf[0],
          role: data.user.roles[0],
          username: data.user.username,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.emailAddress
        });
      }

      organizationService.getOrganizations().subscribe(orgs => {
        this.organizations = orgs;
        if (data && data.user) {
          this.userForm.patchValue({organization: orgs.find(o=> o.id === data.user.memberOf[0].id)});
        } else if (orgs.length === 1) {
          this.userForm.patchValue({organization: orgs[0]});
        }
      });

      this.userService.getRolesDescriptor(RoleTarget.USER).subscribe(r => {
        this.roleDescriptionMap = r;
        this.roles = Object.keys(r) as Role[];
      });

    }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.userService.createUser(this.userForm.value.organization.name, this.userForm.value).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
      }
    });
  }

  update() { 
    let userToUpdate = {...this.data.user};
    let updated = this.userForm.value;
    userToUpdate.username = updated.username;
    userToUpdate.firstName = updated.firstName;
    userToUpdate.lastName = updated.lastName;
    userToUpdate.emailAddress = updated.email;
    userToUpdate.memberOf = [updated.organization];
    userToUpdate.roles = [updated.role];
    this.userService.updateApiKey(userToUpdate.memberOf[0].name, userToUpdate).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
      }
    });
  }

}
