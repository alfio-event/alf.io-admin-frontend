import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserInfo } from '../model/user';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo: UserInfo;
  userInfoForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(private userService: UserService, fb: FormBuilder) {
    this.userInfoForm = fb.group({
      firstName: null,
      lastName: null,
      emailAddress: null,
    });

    this.changePasswordForm = fb.group({
      oldPassword: null,
      newPassword: null,
      newPasswordConfirm: null
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  update(): void {
    this.userService.updateCurrentUser(this.userInfoForm.value).subscribe(res => {
      this.loadUser();
    })
  }

  private loadUser() {
    this.userService.getCurrent().subscribe(userInfo => {
      this.userInfo = userInfo;
      this.userInfoForm.patchValue({firstName: userInfo.firstName, lastName: userInfo.lastName, emailAddress: userInfo.emailAddress});
    });
  }

}
