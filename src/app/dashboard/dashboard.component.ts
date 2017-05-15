import { Component, OnInit, EventEmitter } from '@angular/core';

import { UsersService } from './../shared/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public hasCompany: boolean = false;
  public companyClass: string = "";
  public isOwner: boolean = false;
  constructor(private UserService: UsersService) { }

  ngOnInit() {
    this.UserService.userhasCompany$
    .takeWhile(() => !this.hasCompany)
    .subscribe(
      company => {
        this.hasCompany = company
      }
    );
    this.UserService.userisOwner$
    .takeWhile(() => !this.isOwner)
    .subscribe(
      isOwner => {
        this.isOwner = isOwner
      }
    );
  }

}
