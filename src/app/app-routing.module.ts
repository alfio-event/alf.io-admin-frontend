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
  { path: '', component: EventsComponent },
  { path: 'organizations', component: OrganizationsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'api-keys', component: ApiKeysComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'extension', component: ExtensionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
