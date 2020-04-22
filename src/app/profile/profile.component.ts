import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserInfo } from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo: UserInfo;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser() {
    this.userService.getCurrent().subscribe(userInfo => this.userInfo = userInfo)
  }

}
