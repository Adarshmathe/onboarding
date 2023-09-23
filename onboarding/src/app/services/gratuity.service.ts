import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class GratuityService {
  constructor(private http:HttpClient) { }

  public savegratuitydetails(e){
    return this.http.post(`${baseUrl}/Gratuity/`,e);
  }
  public updategratuitydetails(e){
    return this.http.put(`${baseUrl}/Gratuity/`,e);
  }

  public getgratuitydetails(id){
    return this.http.get(`${baseUrl}/Gratuity/user/`+id);
  }
}
