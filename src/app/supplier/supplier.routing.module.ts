import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierComponent } from './supplier.component';
import { ComponentFixture } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const supplierRoutes = [
   {path: 'fornecedor', component: SupplierComponent, children :[
      {path: 'novo', component: SupplierFormComponent},
      {path: ':id', component: SupplierDetailComponent},
      {path: ':id/editar', component: SupplierFormComponent}
   ]}
];

@NgModule({
   imports: [RouterModule.forChild(supplierRoutes)],
   exports: [RouterModule]
})

export class SupplierRoutingModule {

}