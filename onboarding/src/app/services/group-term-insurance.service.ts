import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class GroupTermInsuranceService {
  
  constructor(private http:HttpClient) { }

  public savegroupterminsurancedetails(e){
    return this.http.post(`${baseUrl}/GroupTermInsurance/`,e);
  }
  public updategroupterminsurancedetails(e){
    return this.http.put(`${baseUrl}/GroupTermInsurance/`,e);
  }

  public getgroupterminsurancedetails(id){
    return this.http.get(`${baseUrl}/GroupTermInsurance/user/`+id);
  }
}
