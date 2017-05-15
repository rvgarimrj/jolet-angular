
import {Component, OnInit} from '@angular/core';

import { UsersService } from './../shared/users.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpUser = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  // @Output() onFormResult = new EventEmitter<any>();

  constructor(private userService: UsersService,
              private NotificationsService: NotificationsService) { }

  ngOnInit() {}

  onSignUpSubmit(){

    this.userService.registerUser(this.signUpUser).subscribe(
      res => {
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
      },
      error =>
      {
        this.signUpUser.passwordConfirmation = "";
        this.NotificationsService.error(
            'Erro no Login',
            error.json().errors.full_messages[0],
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