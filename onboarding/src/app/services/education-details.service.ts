import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class EducationDetailsService {

  constructor(private http:HttpClient) { }

  public saveedudetails(e:any){

    // var formdata = new FormData();
    // formdata.append("data",e)
    // formdata.append(file[],file)

    return this.http.post(`${baseUrl}/Edu/`,e);
  }
  public updateedudetails(e){
    return this.http.put(`${baseUrl}/Edu/`,e);
  }

  public getdetailsofeducation(id){
    return this.http.get(`${baseUrl}/Edu/user/`+id);
  }


}
