import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class PersonaldetailsService {

  constructor( private http:HttpClient) { }
  
  public savepersonalDetails(p){
    return this.http.post(`${baseUrl}/personal/`,p);
  }

  public updatepersonalDetails(p){
    return this.http.put(`${baseUrl}/personal/`,p);
  }
  public get(id){
    return this.http.get(`${baseUrl}/personal/user/`+id);

  }
  public getCountries(){
    return this.http.get(`${baseUrl}/find/countries/`);

  }
  public getStates(id){
    return this.http.get(`${baseUrl}/find/state/`+id);

  }
  public getCities(id){
    return this.http.get(`${baseUrl}/find/city/`+id);

  }
  public getDistricts(id){
    return this.http.get(`${baseUrl}/find/district/`+id);

  }
}
