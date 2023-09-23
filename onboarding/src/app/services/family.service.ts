import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  constructor(private http:HttpClient) { }

  public savefamilydetails(e){
    return this.http.post(`${baseUrl}/Family/`,e);
  }
  public updatefamilydetails(e){
    return this.http.put(`${baseUrl}/Family/`,e);
  }

  public getfamilydetailsbyuser(id){
    return this.http.get(`${baseUrl}/Family/user/`+id);

  }
}
