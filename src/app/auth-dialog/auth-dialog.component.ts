import { Router } from '@angular/router';
import {Component, OnInit, Input, EventEmitter} from '@angular/core';

import {MaterializeAction} from "angular2-materialize";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  @Input('auth-mode') authMode: 'Login' | 'Cadastro' = 'Login';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private NotificationsService: NotificationsService, private router: Router) {

  }

  onLoginFormResult(e){


    if(e.signedIn){
      this.closeDialog();
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
    }
      
      
    else{
      this.NotificationsService.error(
          'Erro no Login',
          e.error.json().errors[0],
          {
              timeOut: 8000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              lastOnBottom: true
          }
        );
    }
  }

  onRegisterFormResult(e){
    if(e.signedUp)
    {
      this.closeDialog();
      this.router.navigate(['/']);
      this.NotificationsService.success(
        'Cadastrado com sucesso !',
        'Bem vindo(a) :-)',
        {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            lastOnBottom: true,
            animate: "fromLeft"
        }
      );
    }
    else{
      this.NotificationsService.error(
          'Erro de cadastro',
          e.error.json().errors.full_messages[0],
          {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              lastOnBottom: true,
              animate: "fromLeft"
          }
        );
    }
  }



  openDialog(mode: 'Login' | 'Cadastro' = 'Login'){
    this.authMode = mode;
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

  ngOnInit() {
  }

  isLoginMode(){return this.authMode == 'Login'}
  isRegisterMode(){return this.authMode == 'Cadastro'}


}