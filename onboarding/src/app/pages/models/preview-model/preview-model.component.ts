import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { codeofconducturl } from 'src/app/services/helper';
import { previewmodeldata } from 'src/models/utils';

@Component({
  selector: 'app-preview-model',
  templateUrl: './preview-model.component.html',
  styleUrls: ['./preview-model.component.css'],
})
export class PreviewModelComponent implements OnInit {
  filetype: string;
  filename: string;
  id: Number;
  title: string;

  pdfSrc: string;
  image: string[] = [];

  public page = 1;
  public pageLabel!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: previewmodeldata) {}

  ngOnInit(): void {
    this.filetype = this.data.filetype;
    this.filename = this.data.filename;
    this.id = this.data.id;

    var n = this.filename.lastIndexOf('.');
    this.title = this.filename.substring(0, n);

    if (this.filetype == 'pdf') {
      this.pdfSrc =
        'http://localhost:1998/image/download/' + this.id + '/' + this.filename;
    }

    if (this.filetype == 'image') {
      let path: string =
        'http://localhost:1998/image/download/' + this.id + '/' + this.filename;

      this.image.push(path);
    }
  }
}
