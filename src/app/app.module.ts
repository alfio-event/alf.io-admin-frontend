import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomLoader } from './shared/i18n.service';

import { MatToolbarModule, MatIconModule, MatInputModule, MatSidenavModule,
  MatListModule, MatButtonModule, MatSelectModule, MatTableModule,
  MatChipsModule, MatFormFieldModule, MatSnackBarModule, MatDialogModule,
  MatCheckboxModule, MatPaginatorModule, MatRadioModule, MatSlideToggleModule} from  '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EventsComponent } from './organization/events/events.component';
import { MyOrganizationComponent } from './organization/my-organization/my-organization.component';
import { UsersComponent } from './organization/users/users.component';
import { ApiKeysComponent } from './organization/api-keys/api-keys.component';
import { GroupsComponent } from './organization/groups/groups.component';
import { ConfigurationComponent } from './organization/configuration/configuration.component';
import { ExtensionComponent } from './admin/extension/extension.component';
import { OrganizationSelectDialogComponent } from './organization-select-dialog/organization-select-dialog.component';
import { BasicConfigurationDialogComponent } from './basic-configuration-dialog/basic-configuration-dialog.component';
import { OrganizationComponent } from './admin/organization/organization.component';
import { ConfigurationComponent as AdminConfigurationComponent } from './admin/configuration/configuration.component';
import { UsersComponent as AdminUsersComponent } from './admin/users/users.component';
import { NewOrganizationDialogComponent } from './admin/organization/new-organization-dialog/new-organization-dialog.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new CustomLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    MyOrganizationComponent,
    UsersComponent,
    ApiKeysComponent,
    GroupsComponent,
    ConfigurationComponent,
    ExtensionComponent,
    OrganizationSelectDialogComponent,
    BasicConfigurationDialogComponent,
    OrganizationComponent,
    AdminConfigurationComponent,
    AdminUsersComponent,
    NewOrganizationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN',
    }),
    BrowserAnimationsModule,
    //
    MatToolbarModule, MatIconModule, MatInputModule, MatSidenavModule,
    MatListModule, MatButtonModule, MatSelectModule, MatTableModule,
    MatChipsModule, MatFormFieldModule, MatSnackBarModule, MatDialogModule,
    MatCheckboxModule, MatPaginatorModule, MatRadioModule, MatSlideToggleModule,
    //
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ],
  entryComponents: [
    OrganizationSelectDialogComponent, 
    BasicConfigurationDialogComponent,
    NewOrganizationDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
