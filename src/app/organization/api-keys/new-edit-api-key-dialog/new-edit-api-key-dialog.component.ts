import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Role, RoleTarget, RoleDescriptor } from 'src/app/model/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-edit-api-key-dialog',
  templateUrl: './new-edit-api-key-dialog.component.html'
})
export class NewEditApiKeyDialogComponent implements OnInit {

  apiKeyForm: FormGroup;
  roleDescriptionMap: { [key in Role]?: RoleDescriptor };
  roles: Role[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {organizationName: string},
    private dialogRef: MatDialogRef<NewEditApiKeyDialogComponent>,
    private userService: UserService,
    fb: FormBuilder, 
    ) {
    this.apiKeyForm = fb.group({
      role: null,
      description: null
    });

    userService.getRolesDescriptor().subscribe(r => {
      this.roleDescriptionMap = r;
      Object.keys(r).forEach(k => {
        if (r[k as Role].target === RoleTarget.API_KEY) {
          this.roles.push(k as Role);
        }
      });
      console.log(this.roles);
    })
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.userService.createApiKey(this.data.organizationName, this.apiKeyForm.value).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
      }
    })
  }

  ngOnInit() {
  }

}
