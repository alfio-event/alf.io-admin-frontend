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
  MatChipsModule, MatFormFieldModule, MatSnackBarModule, MatDialogModule } from  '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EventsComponent } from './events/events.component';
import { MyOrganizationComponent } from './my-organization/my-organization.component';
import { UsersComponent } from './users/users.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';
import { GroupsComponent } from './groups/groups.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ExtensionComponent } from './extension/extension.component';
import { OrganizationSelectDialogComponent } from './organization-select-dialog/organization-select-dialog.component';


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
    OrganizationSelectDialogComponent
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
  entryComponents: [OrganizationSelectDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
