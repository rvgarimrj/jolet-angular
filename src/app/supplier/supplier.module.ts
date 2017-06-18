import { SupplierService } from './supplier.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierComponent } from './supplier.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierRoutingModule } from './supplier.routing.module';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';

@NgModule({
  imports: [
    CommonModule,
    SupplierRoutingModule
  ],
  declarations: [
    SupplierComponent,
    SupplierFormComponent,
    SupplierDetailComponent
  ],
  providers: [SupplierService]
})
export class SupplierModule { }
