import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Angular2TokenService, A2tUiModule} from 'angular2-token';
import {Subject, Observable} from "rxjs";
import {Response} from "@angular/http";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { environment } from '../../environments/environment';
import { NotificationsService } from 'angular2-notifications'; 
 
 
@Injectable()
export class UsersService {
  userSignedIn$:Subject<boolean> = new Subject();
  userhasImage$:Subject<boolean> = new Subject();
  userImage$:Subject<string> = new Subject();
  userhasCompany$:Subject<boolean> = new Subject();
  companyName$:Subject<string> = new Subject;
  userisOwner$:Subject<boolean>=new Subject;
  loggedOut$:Subject<boolean>=new Subject;

  public result:any="";


  constructor(private http: Http, 
              private _tokenService: Angular2TokenService,
              private NotificationsService: NotificationsService,
              private router: Router) { }
  
  registerUser(signUpData:  {email:string, password:string, passwordConfirmation:string}){
    return this._tokenService.registerAccount(signUpData).map(
        res => {
          if (res.status == 200){
            this.userImage$.next('');
            this.userhasImage$.next(false);
            this.userhasCompany$.next(false);
            this.router.navigate(['/primeira-vez']);
            
         }
          return res
        }
    );
  }
  changeCompanyName(company){
    // console.log(company);
    this.companyName$.next(company);
  }
  logInUser(signInData: {email:string, password:string}):Observable<Response>{
    
    this.loggedOut$.next(false);
    return this._tokenService.signIn(signInData).map(
        res => {
          if (res.status == 200)  {
            
            
            if (res.json().kind_of_user == 0){
              this.userisOwner$.next(true);
            }
            else {
              this.userisOwner$.next(false);
            }
            if ((res.json().data.photo.mini.url != null && res.json().data.photo.mini.url != "")) {
              this.userSignedIn$.next(res.json().success);
              this.userhasImage$.next(true);
              this.userImage$.next(res.json().data.photo.mini.url);
              }
              else {
              this.userSignedIn$.next(false);
              this.userhasImage$.next(false);
              this.userImage$.next('');
            }
            if (res.json().data.company_id != null) {
              this.userhasCompany$.next(true);
            }
            else {
              this.userhasCompany$.next(false);
            } 
          }
          
          return res
        },
        
    );
  }
   logOutUser():Observable<Response>{
    
    return this._tokenService.signOut().map(
        res => {
          this.loggedOut$.next(true);
          // console.log("entrei no servico logoutsuer");
          // this.userSignedIn$.next(false);
          return res;
        }
    );
  }
  show():Observable<Response>{
    // console.log("entrei no serviço show");
    return this._tokenService.get('current_user', {}).map(res => 
    { 
      // console.log(res.json());
      if (res.json().kind_of_user == 0){
        this.userisOwner$.next(true);
      }
      else {
        this.userisOwner$.next(false);
      }
      if (res.json().hasOwnProperty('company')) {
        if (res.json().company.short_name != '' && res.json().company.short_name != null) {
          // console.log("tem empresa serviço show");
          this.userhasCompany$.next(true);
          this.companyName$.next(res.json().company.short_name);
        }
        else {
          this.userhasCompany$.next(false);
          this.companyName$.next("");
        }
      }
      else {
          this.userhasCompany$.next(false);
          this.companyName$.next("");
        }
      if ((res.json().photo.mini.url != null && res.json().photo.mini.url != "")) {
              this.userSignedIn$.next(res.json().success);
              this.userhasImage$.next(true);
              this.userImage$.next(res.json().photo.mini.url);
              // console.log(res.json());
              }
              else {
              this.userSignedIn$.next(false);
              this.userhasImage$.next(false);
              this.userImage$.next('');
            } 
      return res.json();
    });
  }
 
  update(params, photo){
    // this.emittCompany(params.short_name);
    
    return this._tokenService.put('users/', {"user":
                                              {"name": params.name,
                                              "email": params.email,
                                              "nickname": params.nickname,
                                              photo: photo},
                                              company: {"company_name": params.company_name,
                                                        "short_name": params.short_name,
                                                        "kind": params.kind,
                                                        "cpf_cnpj": params.cpf_cnpj,
                                                        "street": params.street,
                                                        "number": params.number,
                                                        "city": params.city,
                                                        "zipcode": params.zipcode,
                                                        "state": params.state,
                                                        "phone": params.phone,
                                                        "neighborhood": params.neighborhood
                                                        }
                                            }).map(res => res.json());
  }
}