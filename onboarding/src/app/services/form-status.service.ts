import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root'
})
export class FormStatusService {

  public formstatusSubject = new Subject<boolean>();
  
  constructor(private http:HttpClient) { }

  public saveformstate(e){
    return this.http.post(`${baseUrl}/formstate/`,e);
  }
  public updateformstate(e){
    return this.http.put(`${baseUrl}/formstate/`,e);
  }

  public getformstate(id){
    return this.http.get(`${baseUrl}/formstate/user/`+id);
  }
}
