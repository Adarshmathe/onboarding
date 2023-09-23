import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit{
  @Input() message: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
