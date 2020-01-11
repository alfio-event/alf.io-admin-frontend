import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/shared/organization.service';
import { Organization } from 'src/app/model/organization';
import { UserService } from 'src/app/shared/user.service';
import { Role, RoleDescriptor, RoleTarget } from 'src/app/model/user';

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

      organizationService.getOrganizations().subscribe(orgs => {
        this.organizations = orgs;
        if (orgs.length === 1) {
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

}
