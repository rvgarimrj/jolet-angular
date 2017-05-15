// import { Injectable } from '@angular/core';
// import {Angular2TokenService} from "angular2-token";
// import {Subject, Observable} from "rxjs";
// import {Response} from "@angular/http";

// @Injectable()
// export class AuthService {

//   // userSignedIn$:Subject<boolean> = new Subject();
//   // userhasImage$:Subject<boolean> = new Subject();
//   // userImage$:Subject<string> = new Subject();

//   constructor(private authService:Angular2TokenService) {

//     // this.authService.validateToken().subscribe(
//     //     res => {
//     //       if (res.status == 200) {
//     //         this.userSignedIn$.next(res.json().success);
//     //         this.userhasImage$.next(true);
//     //         this.userImage$.next(res.json().data.photo.mini.url);
//     //       }
//     //       else {
//     //         this.userSignedIn$.next(false);
//     //         this.userhasImage$.next(false);
//     //       } 
//     //     }
//     // )
//   }

//   // logOutUser():Observable<Response>{

//   //   return this.authService.signOut().map(
//   //       res => {
//   //         // this.userSignedIn$.next(false);
//   //         return res;
//   //       }
//   //   );
//   // }

//   // registerUser(signUpData:  {email:string, password:string, passwordConfirmation:string}):Observable<Response>{
//   //   return this.authService.registerAccount(signUpData).map(
//   //       res => {
//   //         // this.userSignedIn$.next(true);
//   //         return res
//   //       }
//   //   );
//   // }

//   // logInUser(signInData: {email:string, password:string}):Observable<Response>{

//   //   return this.authService.signIn(signInData).map(
//   //       res => {
//   //         this.userSignedIn$.next(true);
//   //         return res
//   //         console.log(res);
//   //       }
//   //   );

//   // }

// }