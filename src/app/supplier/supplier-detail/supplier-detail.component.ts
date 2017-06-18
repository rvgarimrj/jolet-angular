import {MaterializeAction} from 'angular2-materialize';

import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';

import { SupplierService } from './../supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../shared/users.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit,OnDestroy {
  supplier: any;
  inscricao: Subscription;
  public hasCompany: boolean = false;
  public companyClass: string = "";
  public isOwner: boolean = false;
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(
      private route: ActivatedRoute,
      private suppliersService: SupplierService,
      private UserService: UsersService,
      private router: Router
  ) { }

 ngOnInit() {
   
   this.UserService.show().subscribe();
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.supplier = this.suppliersService.getSupplier(id);
      }

    );
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
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
  editSupplier(){
    this.router.navigate(['/fornecedor',this.supplier.id, 'editar']);
  } 
  deleteSupplier(property)
  {
    if (confirm("Você tem certeza que quer deletar o fornecedor " + this.supplier.name + " e todos os produtos relacionados a ele ?")) {
      // this.ReservationService.cancel(property.reservation.id)
      //   .subscribe(data => {
      //     var index = this.pending.indexOf(property.id);
      //     this.pending.splice(index, 1);
      //   }
      // );
    }
    return false;
  }
  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
