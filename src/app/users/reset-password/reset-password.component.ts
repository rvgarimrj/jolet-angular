import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Angular2TokenService, UpdatePasswordData } from 'angular2-token';
import {NotificationsService} from 'angular2-notifications'; 
import { AuthDialogComponent } from './../../auth-dialog/auth-dialog.component';
import { UsersService } from './../../shared/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public email: any;
  public token: any;
  public _updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};
  public _output: any;
  public result: any;
 
  constructor(private _tokenService: Angular2TokenService, 
              private NotificationsService: NotificationsService, 
              private router: Router,
              private route: ActivatedRoute,
              private UserService: UsersService) { 
                    // const email: Observable<string> = route.params.map(p => p.uid);
                    // const token: Observable<string> = route.params.map(p => p.token);
                    // const url: Observable<string> = route.url.map(segments => segments.join(''));
                    // route.data includes both `data` and `resolve`
                    // const user = route.data.map(d => d.user);
              }
 

  ngOnInit() {
    this.route.queryParams.subscribe(
      data => { this.email = data['uid'];
                this.token = data['token'];
                this._updatePasswordData.resetPasswordToken = this.token;
    });
  }
    onSubmit() {
      
 
    this._output = null;
 
    this._tokenService.updatePassword(this._updatePasswordData).subscribe(
      res => {
        this.router.navigate(['/']);
        this.UserService.show().subscribe(
            res => 
            {
              this.result = res;
              // console.log(this.result);
            }
          )
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
