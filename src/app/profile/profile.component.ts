import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserInfo } from '../model/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  userInfo: UserInfo;
  userInfoForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService, 
    fb: FormBuilder) {
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
      this.snackBar.open('User profile updated', null, {duration: 2000});
      this.loadUser();
    })
  }

  updatePassword(): void {
    this.userService.updatePasswordForCurrentUser(this.changePasswordForm.value).subscribe(res => {
      if (res.errorCount === 0) {
        this.changePasswordForm.reset();
        this.changePasswordForm.markAsPristine();
        this.changePasswordForm.markAsUntouched();
        this.snackBar.open('Password changed', null, {duration: 2000});
      } else {
        //TODO message
      }
    });
  }

  private loadUser() {
    this.userService.getCurrent().subscribe(userInfo => {
      this.userInfo = userInfo;
      this.userInfoForm.patchValue({firstName: userInfo.firstName, lastName: userInfo.lastName, emailAddress: userInfo.emailAddress});
    });
  }

}
