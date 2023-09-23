import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class MediclamService {

  constructor(private http:HttpClient) { }

  public savemediclaimdetails(e){
    return this.http.post(`${baseUrl}/Mediclaim/`,e);
  }
  public updatemediclaimdetails(e){
    return this.http.put(`${baseUrl}/Mediclaim/`,e);
  }

  public getmediclaimdetails(id){
    return this.http.get(`${baseUrl}/Mediclaim/user/`+id);
  }
}
