import { Component, OnInit,EventEmitter } from '@angular/core';

import { UsersService } from './../shared/users.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public hasCompany: boolean;

  company: string = "";
  
  constructor(private userService: UsersService) { }

  ngOnInit() {
   this.userService.userhasCompany$
    .takeWhile(() => !this.hasCompany)
    .subscribe(hasCompany => { 
                  this.hasCompany = hasCompany
                  // console.log(this.hasCompany)
                });
  }

}
