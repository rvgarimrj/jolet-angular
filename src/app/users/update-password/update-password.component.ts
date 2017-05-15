
import { Router } from '@angular/router';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Angular2TokenService, UpdatePasswordData } from 'angular2-token';
import {NotificationsService} from 'angular2-notifications'; 
import { AuthDialogComponent } from './../../auth-dialog/auth-dialog.component';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  private _updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};
  private _output: any;
 
  constructor(private _tokenService: Angular2TokenService, 
              private NotificationsService: NotificationsService, private router: Router) { }
 
  ngOnInit() {
  }
 
 
  // Submit Data to Backend
  onSubmit() {
 
    this._output = null;
 
    this._tokenService.updatePassword(this._updatePasswordData).subscribe(
      res => {
        // this.router.navigate(['/']);
        this.NotificationsService.success(
          'Senha alterada com sucesso !',
          ':-)',
          {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 600,
              lastOnBottom: true,
              animate: "fromRight"
          }
        );

        this._updatePasswordData = <UpdatePasswordData>{};
        this._output = res;
        // console.log(res.json());
      }, error => {
        this.NotificationsService.error(
          'Erro',
          error.json().errors.full_messages[0],
          {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              lastOnBottom: true
          }
        );
        this._updatePasswordData = <UpdatePasswordData>{};
        this._output = error;
        // console.log(error.json());
      }
    );
  }

}
