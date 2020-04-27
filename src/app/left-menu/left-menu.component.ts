import { Component, Input } from '@angular/core';
import { Organization } from '../model/organization';
import { Router, ActivationEnd } from '@angular/router';
import { UserInfo } from '../model/user';
import { ManageEventComponent } from '../organization/manage-event/manage-event.component';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {

  @Input()
  organization: Organization;

  eventShortName: string;

  @Input()
  userInfo: UserInfo;

  constructor(public router: Router) {
    router.events.subscribe((routeEvent:any) => {
      if (routeEvent instanceof ActivationEnd && routeEvent.snapshot.component === ManageEventComponent) {
        this.eventShortName = routeEvent.snapshot.params['eventShortName'];
      }
    });
  }
}
