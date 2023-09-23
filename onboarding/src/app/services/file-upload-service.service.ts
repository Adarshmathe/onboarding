import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {baseUrl} from './helper';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {


  constructor(private http: HttpClient) { }

  upload(id:any ,file: File): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();

    formData.append('image', file);
    formData.append('userId', id)

    const req = new HttpRequest('POST', `${baseUrl}/image/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${baseUrl}/images`);
  }
}
