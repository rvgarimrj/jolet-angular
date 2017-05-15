import { Router } from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';

import {Angular2TokenService} from "angular2-token";
import { UsersService } from './../shared/users.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy, OnInit {

  public hasPhoto: boolean;
  public img: string ='';
  public result:any = "";
  public hasCompany: boolean;
  public companyName: string ="";
  public logo:string;
  private alive: boolean=true;
  private loggedOut: boolean;

  constructor(public tokenAuthService:Angular2TokenService,
              private router: Router,
              protected userService: UsersService) {
                
              }

  ngOnInit() {
    this.logo = environment.logo_name
    this.userService.loggedOut$
    .takeWhile(() => this.alive)
    .subscribe(loggedOut => { 
                  this.loggedOut = loggedOut;
                  // console.log(this.loggedOut)
                  if (this.loggedOut) 
                  {
                    this.clear(); 
                  }
                });

    this.userService.userImage$
    .takeWhile(() => this.alive)
    .subscribe(photo => { 
                  this.img = photo
                });

    this.userService.userhasImage$
    .takeWhile(() => this.alive)
    .subscribe(hasimage => { 
                  this.hasPhoto = hasimage
                });

    this.userService.userhasCompany$
      .takeWhile(() => this.alive)
      .subscribe(
        hascompany => {
          this.hasCompany = hascompany
          if (!this.hasCompany){
            this.companyName = environment.logo_name;
          }
        }
      )

    this.userService.companyName$
      .takeWhile(() => this.alive)
      .subscribe(
        companyname => {
          this.companyName = companyname
        }
      )
    if (this.tokenAuthService.userSignedIn())
    {this.refresh();}
  }
 ngOnDestroy() {
    this.alive = false;
    // console.log("destruido");
  }
  clear(){
    this.companyName = environment.logo_name;
    this.hasCompany = false;
    this.hasPhoto = false;
    this.img = '';
    // console.log("destruido");
    
  }
  refresh(){
    this.userService.show().subscribe();
    
  }
  logOut(){
    this.userService.logOutUser().subscribe();
    this.router.navigate(['/']);
    
  }
  
}