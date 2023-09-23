import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  public sendEmail(data:any,file:Blob){
   
    const formData: FormData = new FormData();
console.log("serviced++>" ,data);

    formData.append('emaildata', JSON.stringify(data));
    formData.append('file', file)

    const req = new HttpRequest('POST', `${baseUrl}/email/send`, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
