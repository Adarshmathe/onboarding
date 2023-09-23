import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './helper';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DownloadfilesService {

  constructor(private http: HttpClient) { }


  getFiles(id): Observable<any> {
    return this.http.get(`${baseUrl}/image/downloads/${id}`,{
      observe: 'response',
      responseType: 'blob',
    })

  }
}
