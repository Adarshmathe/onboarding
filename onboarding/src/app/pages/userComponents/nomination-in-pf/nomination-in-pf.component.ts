import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { AlertBoxServiceService } from 'src/app/component/nav-bar/alert-box/alert-box-service.service';
import { BankdetailsService } from 'src/app/services/bankdetails.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { NominationInPfService } from 'src/app/services/nomination-in-pf.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { AppValidation } from 'src/app/services/validation';
import { AlertService } from 'src/app/_alert';
import { bank } from 'src/models/bankDetails';
import { formstatus } from 'src/models/formStatus';
import { nominationinPfDetails } from 'src/models/NominationInPf';
import { PersonalDetails } from 'src/models/personalDetails';
import { user } from 'src/models/user';
import { relations } from 'src/models/utils';

@Component({
  selector: 'app-nomination-in-pf',
  templateUrl: './nomination-in-pf.component.html',
  styleUrls: ['./nomination-in-pf.component.css'],
})
export class NominationInPfComponent implements OnInit {
  //   options = {
  //     autoClose: false,
  //     keepAfterRouteChange: false
  // };

  public user: user;
  formStatusdetails: formstatus;
  public nominationInPfDetails: nominationinPfDetails;
  public personaldetails: PersonalDetails;
  public bankdetails: bank;
  public relations = relations();
  public url: String;
  constructor(
    private fb: FormBuilder,
    protected alertService: AlertService,
    public datepipe: DatePipe,
    private bankservice: BankdetailsService,
    private PersonaldetailsService: PersonaldetailsService,
    private login: LoginService,
    private NominationInPfService: NominationInPfService,
    private router: Router,
    private formstatus: FormStatusService,
    private modalService: AlertBoxServiceService,
    private loader: LoaderService,
    private toast: NgToastService,

  ) {}
  private validation = new AppValidation();
  nomination: FormGroup = this.fb.group({
    id: '',
    nuser: {},
    name: [{ value: '', disabled: true }, [Validators.required]],
    fathername: ['', [Validators.required]],
    surname: [{ value: '', disabled: true }, [Validators.required]],
    dob: [{ value: '', disabled: true }, [Validators.required]],
    accountno: [{ value: '', disabled: true }, [Validators.required]],
    sex: [{ value: '', disabled: true }, [Validators.required]],
    marital: [{ value: '', disabled: true }, [Validators.required]],
    address: [{ value: '', disabled: true }, [Validators.required]],
    r2c1: ['', [Validators.required]],
    r2c2: ['', [Validators.required]],
    r2c3: ['', [Validators.required]],
    r2c4: ['', [Validators.required]],
    r2c5: ['', [Validators.required]],
    r2c6: [''],
    r3c1: '',
    r3c2: '',
    r3c3: '',
    r3c4: '',
    r3c5: '',
    r3c6: '',
    r4c1: '',
    r4c2: '',
    r4c3: '',
    r4c4: '',
    r4c5: '',
    r4c6: '',
    r5c1: '',
    r5c2: '',
    r5c3: '',
    r5c4: '',
    r5c5: '',
    r5c6: '',
    r6c1: '',
    r6c2: '',
    r6c3: '',
    r6c4: '',
    r6c5: '',
    r6c6: '',
    t1r2c1: ['', [Validators.required]],
    t1r2c2: ['', [Validators.required]],
    t1r2c3: ['', [Validators.required]],
    t1r2c4: ['', [Validators.required]],
    t1r3c1: '',
    t1r3c2: '',
    t1r3c3: '',
    t1r3c4: '',
    t1r4c1: '',
    t1r4c2: '',
    t1r4c3: '',
    t1r4c4: '',
    t1r5c1: '',
    t1r5c2: '',
    t1r5c3: '',
    t1r5c4: '',
    t1r6c1: '',
    t1r6c2: '',
    t1r6c3: '',
    t1r6c4: '',
    t2r1c1: ['', [Validators.required]],
    t2r1c2: ['', [Validators.required]],
    t2r1c3: ['', [Validators.required]],
    t2r2c1: '',
    t2r2c2: '',
    t2r2c3: '',
    t2r3c1: '',
    t2r3c2: '',
    t2r3c3: '',
    t2r4c1: '',
    t2r4c2: '',
    t2r4c3: '',
    t2r5c1: '',
    t2r5c2: '',
    t2r5c3: '',
    date: [{ value: '', disabled: true }, [Validators.required]],
    name1: ['', [Validators.required]],
    date1: [{ value: '', disabled: true }, [Validators.required]],
    date2: [{ value: '', disabled: true }, [Validators.required]],
    place: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.user = this.login.getuser();
    this.getpersonaldetails();
    this.getFormStatus();
  }

  getFormStatus() {
    this.formstatus.getformstate(this.user.id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.formStatusdetails = data;
          if (this.formStatusdetails.nominationinPF == '2') {
            this.nomination.disable();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  _keyPress(event: any) {
    this.validation.allowedNumberOnly(event);
  }

  Submit() {
    let total: number = 0;
    for (let i = 2; i <= 6; i++) {
      let value = `r${i}c5`;
      total += Number(this.nomination.value[value]);
    }

    if (total != 100) {
      // this.alertService.error('Total amount or share of accumulations in Provident Funds to be paid to each nominee should be 100%')
      this.modalService.showModal(
        'Total amount or share of accumulations in Provident Funds to be paid to each nominee should be 100%'
      );

      return;
    }

    if (this.nomination.value.id == '') {
      this.nomination.value.nuser['id'] = this.user.id;
      this.loader.start();
      this.NominationInPfService.savenominationinpfdetails(
        this.nomination.getRawValue()
      ).subscribe(
        (data: nominationinPfDetails) => {
          this.loader.stop();
          // console.log('save=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Saved',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/coc']);
          this.formstatus.formstatusSubject.next(true);
        },
        (error) => {
          this.loader.stop();
          console.log(error);
          this.toast.error({
            detail: 'Error',
            summary: error.message,
            duration: 3000,
          });
        }
      );
    } else {
      this.loader.start();
      this.NominationInPfService.updatenominationinpfdetails(
        this.nomination.getRawValue()
      ).subscribe(
        (data: nominationinPfDetails) => {
          this.loader.stop();
          // console.log('update=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Updated',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/coc']);
        },
        (error) => {
          this.loader.stop();
          console.log(error);
          this.toast.error({
            detail: 'Error',
            summary: error.message,
            duration: 3000,
          });
        }
      );
    }
  }

  getnominationinPfDetails() {
    this.NominationInPfService.getnominationinpfdetails(this.user.id).subscribe(
      (data: nominationinPfDetails) => {
        this.nominationInPfDetails = data;
          this.initializeForm();
         
        },
      (error) => {
        console.log(error);
        this.defaultinitializeForm();
      }
    );
  }

  getpersonaldetails() {
    this.PersonaldetailsService.get(this.user.id).subscribe(
      (data: PersonalDetails) => {
        this.personaldetails = data;
       
        this.url =
          userdocumenturl +
          this.user.id +
          '/' +
          this.personaldetails.signaturename;
      },
      (error) => {
        console.log(error);
      },
      ()=>{
        this.getbankdetails();
      }
    );
  }

  getbankdetails() {
    this.bankservice.getbankdetails(this.user.id).subscribe(
      (data: bank) => {
        this.bankdetails = data;
        
      },
      (error) => {
        console.log(error);
      },
      ()=>{
        this.getnominationinPfDetails();
      }
    );
  }

  initializeForm() {
    this.nomination.patchValue({
      id: this.nominationInPfDetails.id,
      nuser: { id: this.nominationInPfDetails.nuser.id },
      name:
      this.personaldetails.firstname +
      ' ' +
      this.personaldetails.middlename +
      ' ' +
      this.personaldetails.lastname,
      fathername: this.nominationInPfDetails.fathername,
      surname: this.personaldetails.lastname,
      dob: this.personaldetails.dob,
      accountno: this.bankdetails.extras[0].bankaccountno,
      sex: this.personaldetails.gender,
      marital: this.personaldetails.maritalstatus,
      address:
        this.personaldetails.permanentaddress.houseNo +
        ' ' +
        this.personaldetails.permanentaddress.location +
        ' ' +
        this.personaldetails.permanentaddress.city +
        ' ' +
        this.personaldetails.permanentaddress.state,
      r2c1: this.nominationInPfDetails.r2c1,
      r2c2: this.nominationInPfDetails.r2c2,
      r2c3: this.nominationInPfDetails.r2c3,
      r2c4: this.nominationInPfDetails.r2c4,
      r2c5: this.nominationInPfDetails.r2c5,
      r2c6: this.nominationInPfDetails.r2c6,
      r3c1: this.nominationInPfDetails.r3c1,
      r3c2: this.nominationInPfDetails.r3c2,
      r3c3: this.nominationInPfDetails.r3c3,
      r3c4: this.nominationInPfDetails.r3c4,
      r3c5: this.nominationInPfDetails.r3c5,
      r3c6: this.nominationInPfDetails.r3c6,
      r4c1: this.nominationInPfDetails.r4c1,
      r4c2: this.nominationInPfDetails.r4c2,
      r4c3: this.nominationInPfDetails.r4c3,
      r4c4: this.nominationInPfDetails.r4c4,
      r4c5: this.nominationInPfDetails.r4c5,
      r4c6: this.nominationInPfDetails.r4c6,
      r5c1: this.nominationInPfDetails.r5c1,
      r5c2: this.nominationInPfDetails.r5c2,
      r5c3: this.nominationInPfDetails.r5c3,
      r5c4: this.nominationInPfDetails.r5c4,
      r5c5: this.nominationInPfDetails.r5c5,
      r5c6: this.nominationInPfDetails.r5c6,
      r6c1: this.nominationInPfDetails.r6c1,
      r6c2: this.nominationInPfDetails.r6c2,
      r6c3: this.nominationInPfDetails.r6c3,
      r6c4: this.nominationInPfDetails.r6c4,
      r6c5: this.nominationInPfDetails.r6c5,
      r6c6: this.nominationInPfDetails.r6c6,
      t1r2c1: this.nominationInPfDetails.t1r2c1,
      t1r2c2: this.nominationInPfDetails.t1r2c2,
      t1r2c3: this.nominationInPfDetails.t1r2c3,
      t1r2c4: this.nominationInPfDetails.t1r2c4,
      t1r3c1: this.nominationInPfDetails.t1r3c1,
      t1r3c2: this.nominationInPfDetails.t1r3c2,
      t1r3c3: this.nominationInPfDetails.t1r3c3,
      t1r3c4: this.nominationInPfDetails.t1r3c4,
      t1r4c1: this.nominationInPfDetails.t1r4c1,
      t1r4c2: this.nominationInPfDetails.t1r4c2,
      t1r4c3: this.nominationInPfDetails.t1r4c3,
      t1r4c4: this.nominationInPfDetails.t1r4c4,
      t1r5c1: this.nominationInPfDetails.t1r5c1,
      t1r5c2: this.nominationInPfDetails.t1r5c2,
      t1r5c3: this.nominationInPfDetails.t1r5c3,
      t1r5c4: this.nominationInPfDetails.t1r5c4,
      t1r6c1: this.nominationInPfDetails.t1r6c1,
      t1r6c2: this.nominationInPfDetails.t1r6c2,
      t1r6c3: this.nominationInPfDetails.t1r6c3,
      t1r6c4: this.nominationInPfDetails.t1r6c4,
      t2r1c1: this.nominationInPfDetails.t2r1c1,
      t2r1c2: this.nominationInPfDetails.t2r1c2,
      t2r1c3: this.nominationInPfDetails.t2r1c3,
      t2r2c1: this.nominationInPfDetails.t2r2c1,
      t2r2c2: this.nominationInPfDetails.t2r2c2,
      t2r2c3: this.nominationInPfDetails.t2r2c3,
      t2r3c1: this.nominationInPfDetails.t2r3c1,
      t2r3c2: this.nominationInPfDetails.t2r3c2,
      t2r3c3: this.nominationInPfDetails.t2r3c3,
      t2r4c1: this.nominationInPfDetails.t2r4c1,
      t2r4c2: this.nominationInPfDetails.t2r4c2,
      t2r4c3: this.nominationInPfDetails.t2r4c3,
      t2r5c1: this.nominationInPfDetails.t2r5c1,
      t2r5c2: this.nominationInPfDetails.t2r5c2,
      t2r5c3: this.nominationInPfDetails.t2r5c3,
      date: this.nominationInPfDetails.date,
      name1: this.nominationInPfDetails.name1,
      date1: this.nominationInPfDetails.date1,
      date2: this.nominationInPfDetails.date2,
      place: this.nominationInPfDetails.place,
    });
  }

  defaultinitializeForm() {
    this.nomination.patchValue({
      name:
        this.personaldetails.firstname +
        ' ' +
        this.personaldetails.middlename +
        ' ' +
        this.personaldetails.lastname,
      // fathername:this.nominationInPfDetails.fathername,
      surname: this.personaldetails.lastname,
      dob: this.personaldetails.dob,
      accountno: this.bankdetails.extras[0].bankaccountno,
      sex: this.personaldetails.gender,
      marital: this.personaldetails.maritalstatus,
      address:
        this.personaldetails.permanentaddress.houseNo +
        ' ' +
        this.personaldetails.permanentaddress.location +
        ' ' +
        this.personaldetails.permanentaddress.city +
        ' ' +
        this.personaldetails.permanentaddress.state,
      // r2c1:this.nominationInPfDetails.r2c1,
      // r2c2:this.nominationInPfDetails.r2c2,
      // r2c3:this.nominationInPfDetails.r2c3,
      // r2c4:this.nominationInPfDetails.r2c4,
      // r2c5:this.nominationInPfDetails.r2c5,
      // r2c6:this.nominationInPfDetails.r2c6,
      // r3c1:this.nominationInPfDetails.r3c1,
      // r3c2:this.nominationInPfDetails.r3c2,
      // r3c3:this.nominationInPfDetails.r3c3,
      // r3c4:this.nominationInPfDetails.r3c4,
      // r3c5:this.nominationInPfDetails.r3c5,
      // r3c6:this.nominationInPfDetails.r3c6,
      // r4c1:this.nominationInPfDetails.r4c1,
      // r4c2:this.nominationInPfDetails.r4c2,
      // r4c3:this.nominationInPfDetails.r4c3,
      // r4c4:this.nominationInPfDetails.r4c4,
      // r4c5:this.nominationInPfDetails.r4c5,
      // r4c6:this.nominationInPfDetails.r4c6,
      // r5c1:this.nominationInPfDetails.r5c1,
      // r5c2:this.nominationInPfDetails.r5c2,
      // r5c3:this.nominationInPfDetails.r5c3,
      // r5c4:this.nominationInPfDetails.r5c4,
      // r5c5:this.nominationInPfDetails.r5c5,
      // r5c6:this.nominationInPfDetails.r5c6,
      // r6c1:this.nominationInPfDetails.r6c1,
      // r6c2:this.nominationInPfDetails.r6c2,
      // r6c3:this.nominationInPfDetails.r6c3,
      // r6c4:this.nominationInPfDetails.r6c4,
      // r6c5:this.nominationInPfDetails.r6c5,
      // r6c6:this.nominationInPfDetails.r6c6,
      // t1r2c1:this.nominationInPfDetails.t1r2c1,
      // t1r2c2:this.nominationInPfDetails.t1r2c2,
      // t1r2c3:this.nominationInPfDetails.t1r2c3,
      // t1r2c4:this.nominationInPfDetails.t1r2c4,
      // t1r3c1:this.nominationInPfDetails.t1r3c1,
      // t1r3c2:this.nominationInPfDetails.t1r3c2,
      // t1r3c3:this.nominationInPfDetails.t1r3c3,
      // t1r3c4:this.nominationInPfDetails.t1r3c4,
      // t1r4c1:this.nominationInPfDetails.t1r4c1,
      // t1r4c2:this.nominationInPfDetails.t1r4c2,
      // t1r4c3:this.nominationInPfDetails.t1r4c3,
      // t1r4c4:this.nominationInPfDetails.t1r4c4,
      // t1r5c1:this.nominationInPfDetails.t1r5c1,
      // t1r5c2:this.nominationInPfDetails.t1r5c2,
      // t1r5c3:this.nominationInPfDetails.t1r5c3,
      // t1r5c4:this.nominationInPfDetails.t1r5c4,
      // t1r6c1:this.nominationInPfDetails.t1r6c1,
      // t1r6c2:this.nominationInPfDetails.t1r6c2,
      // t1r6c3:this.nominationInPfDetails.t1r6c3,
      // t1r6c4:this.nominationInPfDetails.t1r6c4,
      // t2r1c1:this.nominationInPfDetails.t2r1c1,
      // t2r1c2:this.nominationInPfDetails.t2r1c2,
      // t2r1c3:this.nominationInPfDetails.t2r1c3,
      // t2r2c1:this.nominationInPfDetails.t2r2c1,
      // t2r2c2:this.nominationInPfDetails.t2r2c2,
      // t2r2c3:this.nominationInPfDetails.t2r2c3,
      // t2r3c1:this.nominationInPfDetails.t2r3c1,
      // t2r3c2:this.nominationInPfDetails.t2r3c2,
      // t2r3c3:this.nominationInPfDetails.t2r3c3,
      // t2r4c1:this.nominationInPfDetails.t2r4c1,
      // t2r4c2:this.nominationInPfDetails.t2r4c2,
      // t2r4c3:this.nominationInPfDetails.t2r4c3,
      // t2r5c1:this.nominationInPfDetails.t2r5c1,
      // t2r5c2:this.nominationInPfDetails.t2r5c2,
      // t2r5c3:this.nominationInPfDetails.t2r5c3,
      date: new Date(),
      // name1:this.nominationInPfDetails.name1,
      date1: new Date(),
      date2: new Date(),
      // place: this.nominationInPfDetails.place
    });
  }
}
