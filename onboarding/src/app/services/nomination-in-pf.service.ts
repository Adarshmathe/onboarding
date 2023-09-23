import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class NominationInPfService {

  constructor(private http:HttpClient) { }

  public savenominationinpfdetails(e){
    return this.http.post(`${baseUrl}/NominationInPf/`,e);
  }
  public updatenominationinpfdetails(e){
    return this.http.put(`${baseUrl}/NominationInPf/`,e);
  }

  public getnominationinpfdetails(id){
    return this.http.get(`${baseUrl}/NominationInPf/user/`+id);
  }
}
