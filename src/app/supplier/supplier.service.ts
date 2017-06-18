import { Injectable } from '@angular/core';

@Injectable()
export class SupplierService {
  
  private suppliers: any =[
    {id: 1, name: 'Fornecedor 01', email:'fornecedor01@email.com', phone: '(21) 2343-9881', contact: 'Aline - parte de manhã'},
    {id: 2, name: 'Fornecedor 02', email:'fornecedor02@email.com', phone: '(21) 2343-9881', contact: 'Aline - parte de manhã'},
    {id: 3, name: 'Fornecedor 03', email:'fornecedor03@email.com', phone: '(21) 2343-9881', contact: 'Aline - parte de manhã'}
  ];

  getSupplier(id: number){
    for (let i=0; i<this.suppliers.length; i++){
      let supplier = this.suppliers[i];
      if (supplier.id == id){
        return supplier;
      }
    }
    return null;
  }
  
  getSuppliers(){
    return this.suppliers;
  }
  constructor() { }

}
