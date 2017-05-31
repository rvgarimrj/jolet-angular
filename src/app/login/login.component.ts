import { Subject } from 'rxjs';
import {Component, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

import {Angular2TokenService} from "angular2-token";
import { NotificationsService } from 'angular2-notifications'; 
import { UsersService } from './../shared/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public result : any=""
  
  signInUser = {
    email: '',
    password: ''
  };

  // @Output() onFormResult = new EventEmitter<any>();
  constructor(private tokenAuthSerivce:Angular2TokenService, 
              private NotificationsService: NotificationsService, 
              private router: Router,
              private UserService: UsersService) { }

  ngOnInit() {}

  forgotPassword(){
    if (this.signInUser.email == "" ){
      this.NotificationsService.alert(
              'Informe seu e-mail',
              '',
              {
                  position: ["top", "left"],
                  timeOut: 4000,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: true,
                  maxLength: 600,
                  lastOnBottom: true,
                  animate: "fromRight"
              }
            );

    }
    else{
      this.tokenAuthSerivce.resetPassword({
      email: this.signInUser.email,
      }).subscribe(
          res => { this.NotificationsService.info(
              'Verifique seu e-mail',
              'Enviamos as instruções de como alterar sua senha para seu e-mail.',
              {
                  position: ["top", "left"],
                  timeOut: 4000,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: true,
                  lastOnBottom: true,
                  animate: "fromRight"
              }
            );
          },
          error => {
            this.NotificationsService.error(
            'Erro',
            error.json().errors[0],
            {
                timeOut: 8000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                lastOnBottom: true
            }
          );
          } 
        )
      }
  }
  onSignInSubmit(){
      console.log(this.signInUser);
      this.UserService.logInUser(this.signInUser).subscribe(
      res => {
        this.result = res;
        this.router.navigate(['/']);
        this.NotificationsService.success(
          'Conecato com sucesso !',
          ':-)',
          {
              position: ["top", "left"],
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 600,
              lastOnBottom: true,
              animate: "fromRight"
          }
        );
        if (this.result.json().data.company_id != null ){
          this.UserService.show().subscribe(
            res => 
            {
              this.result = res;
            }
          )
        }

      },
      error => {
        this.NotificationsService.error(
            'Erro no Login',
            error.json().errors[0],
            {
                timeOut: 8000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                lastOnBottom: true
            }
          );
      }
    );
  }
}