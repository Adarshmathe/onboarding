import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class CodeOfConductService {

  constructor(private http:HttpClient) { }

  public savecocdetails(e:any){
    return this.http.post(`${baseUrl}/coc/`,e);
  }
  public updatecocdetails(e){
    return this.http.put(`${baseUrl}/coc/`,e);
  }

  public getdetailsofcoc(id){
    return this.http.get(`${baseUrl}/coc/user/`+id);
  }



}
