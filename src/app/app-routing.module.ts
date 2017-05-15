import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { DeleteAccountComponent } from './users/delete-account/delete-account.component';
import { FirstTimeComponent } from './first-time/first-time.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './users/update-password/update-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { NotfoundComponent } from './notfound/notfound.component';
import {HomeComponent} from "./home/home.component";
import { ProfileComponent } from './profile/profile.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserShowComponent } from './users/user-show/user-show.component';
import { Angular2TokenService } from 'angular2-token';

const routes: Routes = [
  { path: '', component: HomeComponent,pathMatch: 'full'},
  { path: 'home',component: HomeComponent },
  { path: 'primeira-vez',component: FirstTimeComponent, canActivate: [Angular2TokenService] },
  { path: 'perfil', component: ProfileComponent , canActivate: [Angular2TokenService]},
  { path: 'cancelar-conta', component: DeleteAccountComponent , canActivate: [Angular2TokenService]},
  { path: 'login', component: LoginComponent},
  { path: 'cadastrar-se', component: RegisterComponent},
  { path: 'mudar-senha', component: UpdatePasswordComponent , canActivate: [Angular2TokenService]},
  { path: 'esqueci-minha-senha', component: ResetPasswordComponent },
  
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
