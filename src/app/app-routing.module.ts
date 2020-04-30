import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './organization/events/events.component';
import { MyOrganizationComponent } from './organization/my-organization/my-organization.component';
import { UsersComponent } from './organization/users/users.component';
import { UsersComponent as AdminUsersComponent } from './admin/users/users.component';
import { ApiKeysComponent } from './organization/api-keys/api-keys.component';
import { GroupsComponent } from './organization/groups/groups.component';
import { ConfigurationComponent } from './organization/configuration/configuration.component';
import { ExtensionComponent } from './admin/extension/extension.component';
import { OrganizationComponent } from './admin/organization/organization.component';
import { ConfigurationComponent as AdminConfigurationComponent } from './admin/configuration/configuration.component';
import { NewEventComponent } from './organization/new-event/new-event.component';
import { ManageEventComponent } from './organization/manage-event/manage-event.component';
import { ExtensionLogComponent } from './admin/extension/extension-log/extension-log.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './organization/manage-event/dashboard/dashboard.component';
import { EmailLogComponent } from './organization/manage-event/email-log/email-log.component';
import { ComposeMessageComponent } from './organization/manage-event/compose-message/compose-message.component';


const routes: Routes = [
  { path: 'organization/:org', component: EventsComponent },
  { path: 'organization/:org/organization', component: MyOrganizationComponent },
  { path: 'organization/:org/users', component: UsersComponent },
  { path: 'organization/:org/api-keys', component: ApiKeysComponent },
  { path: 'organization/:org/groups', component: GroupsComponent },
  { path: 'organization/:org/configuration', component: ConfigurationComponent },
  { path: 'organization/:org/new-event', component: NewEventComponent },
  { path: 'organization/:org/event/:eventShortName', component: ManageEventComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'email-log', component: EmailLogComponent },
    { path: 'compose-message', component: ComposeMessageComponent }
  ]},
  { path: 'profile', component: ProfileComponent },
  { path: 'admin/organization', component: OrganizationComponent },
  { path: 'admin/configuration', component: AdminConfigurationComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/extension', component: ExtensionComponent },
  { path: 'admin/extension/log', component: ExtensionLogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
