import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class BankdetailsService {

  constructor(private http:HttpClient) { }

  public savebankdetails(e){
    return this.http.post(`${baseUrl}/bank/`,e);
  }
  public updatebankdetails(e){
    return this.http.put(`${baseUrl}/bank/`,e);
  }

  public getbankdetails(id){
    return this.http.get(`${baseUrl}/bank/user/`+id);
  }
}
