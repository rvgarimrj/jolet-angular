
export class Company {
  id: number;
  company_name: string;
  short_name: string;
  kind: string;
  cpf_cnpj: string;
  street: string;
  number: string;
  city: string;
  zipcode: string;
  state: string;
  neighborhood: string;
  phone: string;
  company_email: string;

 
  constructor(companyInfo:any) {
    this.id = companyInfo.id;
    this.company_name = companyInfo.company_name;
    this.short_name = companyInfo.short_name;
    this.kind = companyInfo.kind;
    this.cpf_cnpj = companyInfo.cpf_cnpj;
    this.street = companyInfo.street;
    this.number = companyInfo.number;
    this.city = companyInfo.city;
    this.zipcode = companyInfo.zipcode;
    this.state = companyInfo.state;
    this.neighborhood = companyInfo.neighborhood;
    this.phone = companyInfo.phone;
    this.company_email = companyInfo.company_email;

    
  }
}