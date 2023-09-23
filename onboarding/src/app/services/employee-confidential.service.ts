import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class EmployeeConfidentialService {

  constructor(private http:HttpClient) { }

  public saveemployeeconfidentialdetails(e){
    return this.http.post(`${baseUrl}/Employeeconfidential/`,e);
  }
  public updateemployeeconfidentialdetails(e){
    return this.http.put(`${baseUrl}/Employeeconfidential/`,e);
  }

  public getemployeeconfidentialdetails(id){
    return this.http.get(`${baseUrl}/Employeeconfidential/user/`+id);
  }
}
