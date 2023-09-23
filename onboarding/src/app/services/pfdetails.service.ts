import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class PfdetailsService {
  
  constructor(private http:HttpClient) { }

  public savepfdetails(e){
    return this.http.post(`${baseUrl}/pf/`,e);
  }
  public updatepfdetails(e){
    return this.http.put(`${baseUrl}/pf/`,e);
  }

  public getpfdetails(id){
    return this.http.get(`${baseUrl}/pf/user/`+id);
  }
}
