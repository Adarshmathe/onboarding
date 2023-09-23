import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor() { }

  public navbar_subject = new Subject<boolean>();
}
