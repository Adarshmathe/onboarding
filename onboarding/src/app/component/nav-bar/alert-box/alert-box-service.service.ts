import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertBoxComponent } from './alert-box.component';

@Injectable({
  providedIn: 'root'
})
export class AlertBoxServiceService {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

public showModal(message): void {

  this.bsModalRef = this.modalService.show(AlertBoxComponent, {
  
     initialState: { message: message }
  });
}
}
