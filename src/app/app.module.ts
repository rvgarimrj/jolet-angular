import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { Angular2TokenService } from 'angular2-token';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserShowComponent } from './users/user-show/user-show.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersService } from './shared/users.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from './shared/services/loader.service';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdatePasswordComponent } from './users/update-password/update-password.component';
import { FirstTimeComponent } from './first-time/first-time.component';
import { DeleteAccountComponent } from './users/delete-account/delete-account.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserShowComponent,
    UserEditComponent,
    NotfoundComponent,
    MessagesComponent,
    DashboardComponent,
    UpdatePasswordComponent,
    FirstTimeComponent,
    DeleteAccountComponent,
    ResetPasswordComponent,
    FormDebugComponent,
    DropdownComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [ Angular2TokenService, UsersService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
