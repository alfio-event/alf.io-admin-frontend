import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Role, RoleTarget, RoleDescriptor, User } from 'src/app/model/user';
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
    @Inject(MAT_DIALOG_DATA) public data: {organizationName: string, apiKey: User},
    private dialogRef: MatDialogRef<NewEditApiKeyDialogComponent>,
    private userService: UserService,
    private fb: FormBuilder) {
  }

  ngOnInit() {

    let apiKey = this.data.apiKey;

    this.apiKeyForm = this.fb.group({
      role: apiKey ? apiKey.roles[0] : null,
      description: apiKey ? apiKey.description : null
    });

    this.userService.getRolesDescriptor(RoleTarget.API_KEY).subscribe(r => {
      this.roleDescriptionMap = r;
      this.roles = Object.keys(r) as Role[];
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.userService.createApiKey(this.data.organizationName, this.apiKeyForm.value).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
      }
    });
  }

  update() {
    let apiKey = {...this.data.apiKey,};
    apiKey.description = this.apiKeyForm.value.description;
    apiKey.roles = [this.apiKeyForm.value.role];
    this.userService.updateApiKey(this.data.organizationName, apiKey).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
      }
    });
  }

}
