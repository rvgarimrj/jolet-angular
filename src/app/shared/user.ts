import { Company } from './company';

export class User {
  id: number;
  name: string;
  email: string;
  nickname: string;
  company: Company;
  photo: any;
  kind_of_user: boolean;
  created_at: string;
  updated_at: string;

  constructor(userInfo:any) {
    this.id = userInfo.id;
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.nickname = userInfo.nickname;
    this.kind_of_user = userInfo.kind_of_user;
    this.created_at = userInfo.created_at;
    this.updated_at = userInfo.updated_at;
    this.company = userInfo.company;
    this.photo = userInfo.photo;

    this.company = new Company(userInfo.company);
 
  }
}