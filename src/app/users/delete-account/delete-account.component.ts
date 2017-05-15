import { UsersService } from './../../shared/users.service';

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {Angular2TokenService} from "angular2-token";
import {NotificationsService} from 'angular2-notifications';
import { LoaderService } from './../../shared/services/loader.service';


@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  constructor(private _tokenService:Angular2TokenService,
              private router: Router,
              private NotificationsService: NotificationsService,
              private loaderService: LoaderService,
              private UsersService: UsersService) { }

  ngOnInit() {
  }

  deleteAccount(){
    this.loaderService.display(true);
    this._tokenService.deleteAccount().subscribe(
    res =>      {
        this.UsersService.logOutUser().subscribe();
        this.router.navigate(['/'])
        this.NotificationsService.info(
          'Que pena que você foi embora :-(',
          'Esperamos que volte logo...',
          {
              timeOut: 4000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 30,
              lastOnBottom: true
          },
        );
        
        this.loaderService.display(false);
        
    },
    error =>    
    {
       this.NotificationsService.error(
          'Falha ao excluir',
          error.json().errors[0],
          {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 30,
              lastOnBottom: true
          }
        );
        this.loaderService.display(false);
    }
    );
    
  }
}
