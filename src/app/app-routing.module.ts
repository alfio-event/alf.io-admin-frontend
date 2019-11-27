import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { UsersComponent } from './users/users.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';
import { GroupsComponent } from './groups/groups.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ExtensionComponent } from './extension/extension.component';


const routes: Routes = [
  { path: ':org', component: EventsComponent },
  { path: ':org/organizations', component: OrganizationsComponent },
  { path: ':org/users', component: UsersComponent },
  { path: ':org/api-keys', component: ApiKeysComponent },
  { path: ':org/groups', component: GroupsComponent },
  { path: ':org/configuration', component: ConfigurationComponent },
  { path: ':org/extension', component: ExtensionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
