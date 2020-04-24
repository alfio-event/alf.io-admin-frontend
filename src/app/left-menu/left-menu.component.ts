import { Component, OnInit, Input } from '@angular/core';
import { Organization } from '../model/organization';
import { Router } from '@angular/router';
import { UserInfo } from '../model/user';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  @Input()
  organization: Organization;

  @Input()
  userInfo: UserInfo;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
