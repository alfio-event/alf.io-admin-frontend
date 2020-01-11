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
        organizationId: null,
        role: null,
        username: null,
        firstName: null,
        lastName: null,
        email: null
      });

      organizationService.getOrganizations().subscribe(orgs => {
        this.organizations = orgs;
        if (orgs.length === 1) {
          this.userForm.patchValue({organizationId: orgs[0].id});
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
    this.dialogRef.close();
  }

}
