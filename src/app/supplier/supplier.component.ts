import { Component, OnInit } from '@angular/core';

import { SupplierService } from './supplier.service';
import { UsersService } from './../shared/users.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  public suppliers: any[]=[];
  public hasCompany: boolean = false;
  public companyClass: string = "";
  public isOwner: boolean = false;

  constructor(private suppliersService: SupplierService,
              private UserService: UsersService) {

                
               }

  ngOnInit() {
    this.UserService.show().subscribe();
    this.suppliers = this.suppliersService.getSuppliers();
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
