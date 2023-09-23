import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { AlertBoxServiceService } from 'src/app/component/nav-bar/alert-box/alert-box-service.service';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { CodeOfConductService } from 'src/app/services/code-of-conduct.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { codeofconducturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { code0fconduct } from 'src/models/CodeOfCunduct';
import { formstatus } from 'src/models/formStatus';
import { user } from 'src/models/user';

@Component({
  selector: 'app-code-of-conduct',
  templateUrl: './code-of-conduct.component.html',
  styleUrls: ['./code-of-conduct.component.css'],
})
export class CodeOfConductComponent implements OnInit {
  //pdf path
  pdfSrc = codeofconducturl;
  public user: user;
  public cocdetails: code0fconduct;
  formStatusdetails: formstatus;
  coc: FormGroup = this.fb.group({
    id: '',
    cocuser: {},
    checkbox: ['', [Validators.requiredTrue]],
  });
  totalPages: any;
  currentpage: any;

  constructor(
    private fb: FormBuilder,
    private coc_service: CodeOfConductService,
    private login: LoginService,
    private router: Router,
    private formstatus: FormStatusService,
    private modalService: AlertBoxServiceService,
    public dialog: MatDialog,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.user = this.login.getuser();
    this.getuser();
    this.getFormStatus();
  }

  getFormStatus(): void {
    this.formstatus.getformstate(this.user.id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.formStatusdetails = data;
          if (this.formStatusdetails.codeOfConduct == '2') {
            this.coc.disable();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog() {
    const message = `Are you sure you want to submit?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res == 'Yes') {
        this.Submit();
      }
    });
  }

  Submit(): void {

    if(this.totalPages != this.currentpage){
      this.modalService.showModal(
        'Please Read the PDF file till the last page'
      );
      
      return;
    }


    if (this.coc.value.id == '') {
      this.coc.value.cocuser['id'] = this.user.id;
      this.loader.start();
      this.coc_service.savecocdetails(this.coc.getRawValue()).subscribe(
        (data: code0fconduct) => {
          this.loader.stop();
          // console.log('save=>>>>>>' + data);
          this.router.navigate(['user-dashboard']);
          this.formstatus.formstatusSubject.next(true);
        },
        (error) => {
          this.loader.stop();
          console.log(error);
          this.modalService.showModal(error.error);
        }
      );
    } else {
      this.loader.start();
      this.coc_service.updatecocdetails(this.coc.getRawValue()).subscribe(
        (data: code0fconduct) => {
          this.loader.stop();
          // console.log('update=>>>>>>' + data);
          this.router.navigate(['user-dashboard']);
        },
        (error) => {
          this.loader.stop();
          this.modalService.showModal(error.error);
          console.log(error);
        }
      );
    }
  }

  getuser() {
    this.coc_service.getdetailsofcoc(this.user.id).subscribe(
      (data: code0fconduct) => {
        this.cocdetails = data;
        // console.log(data);

        if (this.cocdetails != null) {
          this.initializeForm();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  initializeForm() {
    this.coc.patchValue({
      id: this.cocdetails.id,
      cocuser: { id: this.cocdetails.cocuser.id },
      checkbox: this.cocdetails.checkbox,
    });
  }


  afterLoadComplete(pdf): void {
    this.totalPages = pdf.numPages;
    
  }
  pageRendered(e) {
    this.currentpage = e.pageNumber;
    
  }
}
