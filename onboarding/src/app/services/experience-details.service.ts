import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExperienceDetailsService {

  constructor(private http:HttpClient) { }

  public saveexpdetails(e){
    return this.http.post(`${baseUrl}/Exp/`,e);
  }
  public updateexpdetails(e){
    return this.http.put(`${baseUrl}/Exp/`,e);
  }

  public getdetailsofuser(id){
    return this.http.get(`${baseUrl}/Exp/user/`+id);

  }
}
