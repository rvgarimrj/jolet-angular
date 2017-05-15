import { UsersService } from './../shared/users.service';

import { Component, OnInit , EventEmitter} from '@angular/core';

import { FormBuilder, Validators,  FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {Angular2TokenService} from "angular2-token";
import { Company } from '../shared/company';
import {NotificationsService} from 'angular2-notifications';
import { User } from './../shared/user';
import { LoaderService } from '../shared/services/loader.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  values = '';
  public user: User;
  public editForm: FormGroup;
  public img: any ="";
  public result: any = "";
  public company: any = "";

 
  constructor(public fb: FormBuilder, 
              private UsersService: UsersService, 
              private router: Router, 
              private NotificationsService: NotificationsService,
              private loaderService: LoaderService)
               {

    this.editForm = this.fb.group({
      name: [""],
      email: ["", Validators.required],
      nickname: [""],
      kind_of_user: ["", Validators.required],
      company_name: ["", Validators.required],
      short_name: ["", Validators.required],
      kind: [""],
      cpf_cnpj: [""],
      street: [""],
      number: [""],
      city: [""],
      zipcode: [""],
      state: [""],
      neighborhood: [""],
      phone: [""],
      photo: "",
      company_email: ["", Validators.required]
    });
    
    
  }
 

  // logOut(){
  //   this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  // }

  ngOnInit() {
   this.UsersService.companyName$
      .takeWhile(() => !this.company)
      .subscribe(
        company => {
          this.company = company
        }
      )
    this.UsersService.show()
      .subscribe(data => {
        
        this.result = data;
        if (!this.result.hasOwnProperty('company')) 
        {
          this.company = { 
            "company_name": "",
            "short_name": "",
            "kind": "",
            "cpf_cnpj": "",
            "phone": "",
            "street": "",
            "number": "",
            "city":"",
            "zipcode": "",
            "state": "",
            "neighborhood": "",
            company_email: this.result.email
          }
          this.result.company = this.company;
          this.user = new User(this.result);
          
          if(this.user.photo.thumb.url != null && this.user.photo.thumb.url != ""){
            this.img = this.user.photo.thumb.url;
          }
          else {
            this.img="http://res.cloudinary.com/dgekdykfj/image/upload/v1492364432/images_r604qc.png";
          }
          this.editForm = this.fb.group({
            name: [this.user.name],
            email: [this.user.email, Validators.required],
            nickname: [this.user.nickname],
            kind_of_user: [this.user.kind_of_user,Validators.required],
            company_name: ["",Validators.required],
            short_name: ["",Validators.required],
            kind: [""],
            cpf_cnpj: [""],
            phone: [""],
            street: [""],
            number: [""],
            city: [""],
            zipcode: [""],
            state: [""],
            neighborhood: [""],
            company_email: [this.user.email,Validators.required],
            photo: "",
          });     
        }
        else {
          this.user = new User(data);
          if(this.user.photo.thumb.url != null && this.user.photo.thumb.url != ""){
            this.img = this.user.photo.thumb.url;
          }
          else {
            this.img="http://res.cloudinary.com/dgekdykfj/image/upload/v1492364432/images_r604qc.png";
          }
          this.editForm = this.fb.group({
            name: [this.user.name],
            email: [this.user.email, Validators.required],
            nickname: [this.user.nickname],
            kind_of_user: [this.user.kind_of_user, Validators.required],
            company_name: [this.user.company.company_name,Validators.required],
            short_name: [this.user.company.short_name,Validators.required],
            kind: [this.user.company.kind],
            cpf_cnpj: [this.user.company.cpf_cnpj],
            phone: [this.user.company.phone],
            street: [this.user.company.street],
            number: [this.user.company.number],
            city: [this.user.company.city],
            zipcode: [this.user.company.zipcode],
            state: [this.user.company.state],
            neighborhood: [this.user.company.neighborhood],
            company_email: [this.user.company.company_email,Validators.required],
            photo: "",
          });
          }
      }
    );
  }
  onKey(event: any) { // without type info
    this.UsersService.changeCompanyName(event.target.value);
  }
  readThis(inputValue: any) : void {
    
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
 
    myReader.onloadend = (e) => {
      // you can perform an action with readed data here
      this.img = myReader.result;
    };
     myReader.readAsDataURL(file);
  }
 
  fileChange(event) {
    this.readThis(event.target);
  }
  
  save(){
    this.loaderService.display(true);
    this.UsersService.update(this.editForm.value, this.img)
      .subscribe(res => {
        this.UsersService.show()
          .subscribe(data => {
            this.result = data;
          })
        this.router.navigate(['/']);
        this.NotificationsService.success(
          'Dados atualizados',
          'Sucesso \\o/',
          {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 30,
              lastOnBottom: true
          },
        );
        this.loaderService.display(false);
      }, error => { 
        console.log(error.json());
        this.NotificationsService.error(
          'Falha ao atualizar',
          error.json().error[0],
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