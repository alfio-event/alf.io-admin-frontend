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
  MatCheckboxModule, MatPaginatorModule, MatRadioModule, MatSlideToggleModule,
  MatMenuModule, MatStepperModule, MatDatepickerModule, MatNativeDateModule,
  MatAutocompleteModule, MatCardModule, MatTooltipModule } from  '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EventsComponent } from './organization/events/events.component';
import { MyOrganizationComponent } from './organization/my-organization/my-organization.component';
import { UsersComponent } from './organization/users/users.component';
import { ApiKeysComponent } from './organization/api-keys/api-keys.component';
import { GroupsComponent } from './organization/groups/groups.component';
import { ConfigurationComponent } from './organization/configuration/configuration.component';
import { ExtensionComponent, PathToOrgAndEventPipe, ExtensionPathPipe } from './admin/extension/extension.component';
import { OrganizationSelectDialogComponent } from './dialog/organization-select-dialog/organization-select-dialog.component';
import { BasicConfigurationDialogComponent } from './dialog/basic-configuration-dialog/basic-configuration-dialog.component';
import { OrganizationComponent } from './admin/organization/organization.component';
import { ConfigurationComponent as AdminConfigurationComponent } from './admin/configuration/configuration.component';
import { UsersComponent as AdminUsersComponent } from './admin/users/users.component';
import { NewEditOrganizationDialogComponent } from './admin/organization/new-edit-organization-dialog/new-edit-organization-dialog.component';
import { NewEventComponent } from './organization/new-event/new-event.component';
import { TicketCategoryDialogComponent } from './organization/ticket-category-dialog/ticket-category-dialog.component';
import { ManageEventComponent } from './organization/manage-event/manage-event.component';
import { NewEditApiKeyDialogComponent } from './organization/api-keys/new-edit-api-key-dialog/new-edit-api-key-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { NewEditUserDialogComponent } from './dialog/new-edit-user-dialog/new-edit-user-dialog.component';
import { NewEditGroupDialogComponent } from './organization/groups/new-edit-group-dialog/new-edit-group-dialog.component';
import { NewEditExtensionDialogComponent } from './admin/extension/new-edit-extension-dialog/new-edit-extension-dialog.component';
import { ToNumberPipe } from './shared/to-number.pipe';
import { ExtensionLogComponent } from './admin/extension/extension-log/extension-log.component';


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
    NewEditOrganizationDialogComponent,
    NewEventComponent,
    TicketCategoryDialogComponent,
    ManageEventComponent,
    NewEditApiKeyDialogComponent,
    ConfirmDialogComponent,
    NewEditUserDialogComponent,
    NewEditGroupDialogComponent,
    NewEditExtensionDialogComponent,
    PathToOrgAndEventPipe,
    ToNumberPipe,
    ExtensionLogComponent,
    ExtensionPathPipe
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
    MatMenuModule, MatStepperModule, MatDatepickerModule, MatNativeDateModule,
    MatAutocompleteModule, MatCardModule, MatTooltipModule,
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
    NewEditOrganizationDialogComponent,
    TicketCategoryDialogComponent,
    NewEditApiKeyDialogComponent,
    ConfirmDialogComponent,
    NewEditUserDialogComponent,
    NewEditGroupDialogComponent,
    NewEditExtensionDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
