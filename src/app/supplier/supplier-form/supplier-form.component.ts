import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';

import { SupplierService } from './../supplier.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {
  supplier: any;
  inscricao: Subscription;

  constructor(
    private route: ActivatedRoute,
    private suppliersService: SupplierService
  ) { }
  
  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.supplier = this.suppliersService.getSupplier(id);
      }

    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }
}
