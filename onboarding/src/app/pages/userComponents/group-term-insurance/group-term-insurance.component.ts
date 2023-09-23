import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { AlertBoxServiceService } from 'src/app/component/nav-bar/alert-box/alert-box-service.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { GroupTermInsuranceService } from 'src/app/services/group-term-insurance.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { AppValidation } from 'src/app/services/validation';
import { AlertService } from 'src/app/_alert';
import { formstatus } from 'src/models/formStatus';
import { groupInsuranceDetails } from 'src/models/GroupTermInsurance';
import { PersonalDetails } from 'src/models/personalDetails';
import { user } from 'src/models/user';
import { relations } from 'src/models/utils';

@Component({
  selector: 'app-group-term-insurance',
  templateUrl: './group-term-insurance.component.html',
  styleUrls: ['./group-term-insurance.component.css'],
})
export class GroupTermInsuranceComponent implements OnInit {
  public user: user;
  public groupTermInsurance: groupInsuranceDetails;
  public url: String;
  public formStatusdetails: formstatus;
  public relations = relations();
  public personaldetails: PersonalDetails;
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    protected alertService: AlertService,
    private login: LoginService,
    private PersonaldetailsService: PersonaldetailsService,
    private GroupTermInsuranceService: GroupTermInsuranceService,
    private router: Router,
    private formstatus: FormStatusService,
    private modalService: AlertBoxServiceService,
    private loader: LoaderService,
    private toast: NgToastService,

  ) {}
  private validation = new AppValidation();
  groupterm: FormGroup = this.fb.group({
    id: '',
    gtiuser: {},
    name: [{ value: '', disabled: true }, [Validators.required]],
    name2: ['', [Validators.required]],
    r1c2: ['', [Validators.required]],
    r1c3: ['', [Validators.required]],
    r1c4: ['', [Validators.required]],
    r1c5: ['', [Validators.required]],
    r1c6: ['', [Validators.required]],
    r1c7: [''],
    r2c2: '',
    r2c3: '',
    r2c4: '',
    r2c5: '',
    r2c6: '',
    r2c7: '',
    r3c2: '',
    r3c3: '',
    r3c4: '',
    r3c5: '',
    r3c6: '',
    r3c7: '',
    r4c2: '',
    r4c3: '',
    r4c4: '',
    r4c5: '',
    r4c6: '',
    r4c7: '',
    r5c2: '',
    r5c3: '',
    r5c4: '',
    r5c5: '',
    r5c6: '',
    r5c7: '',
    r6c2: '',
    r6c3: '',
    r6c4: '',
    r6c5: '',
    r6c6: '',
    r6c7: '',
    name1: [{ value: '', disabled: true }, [Validators.required]],
    place: ['', [Validators.required]],
    erp: ['', [Validators.required]],
    dob: [{ value: '', disabled: true }, [Validators.required]],
    sex: [{ value: '', disabled: true }, [Validators.required]],
    maritalstatus: [{ value: '', disabled: true }, [Validators.required]],
    address: [{ value: '', disabled: true }, [Validators.required]],
    date: [{ value: '', disabled: true }, [Validators.required]],
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
          if (this.formStatusdetails.groupTermInsurance == '2') {
            this.groupterm.disable();
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
    for (let i = 1; i <= 6; i++) {
      let value = `r${i}c6`;
      total += Number(this.groupterm.value[value]);
    }

    if (total != 100) {
      // this.alertService.error('Percentage of Total share to be paid to each nominee should be 100%')
      this.modalService.showModal(
        'Percentage of Total share to be paid to each nominee should be 100%'
      );
      return;
    }

    if (this.groupterm.value.id == '') {
      this.groupterm.value.gtiuser['id'] = this.user.id;
      this.loader.start();
      this.GroupTermInsuranceService.savegroupterminsurancedetails(
        this.groupterm.getRawValue()
      ).subscribe(
        (data: groupInsuranceDetails) => {
          this.loader.stop();
          // console.log('save=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Saved',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/nomination']);
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
      this.GroupTermInsuranceService.updategroupterminsurancedetails(
        this.groupterm.getRawValue()
      ).subscribe(
        (data: groupInsuranceDetails) => {
          this.loader.stop();
          // console.log('update=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Updated',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/nomination']);
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

  getgroupTermInsuranceDetails() {
    this.GroupTermInsuranceService.getgroupterminsurancedetails(
      this.user.id
    ).subscribe(
      (data: groupInsuranceDetails) => {
        this.groupTermInsurance = data;
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
        this.getgroupTermInsuranceDetails();
      }
    );
  }

  initializeForm() {
    this.groupterm.patchValue({
      id: this.groupTermInsurance.id,
      gtiuser: { id: this.groupTermInsurance.gtiuser.id },
      name:
        this.personaldetails.firstname +
        ' ' +
        this.personaldetails.middlename +
        ' ' +
        this.personaldetails.lastname,
      r1c2: this.groupTermInsurance.r1c2,
      r1c3: this.groupTermInsurance.r1c3,
      r1c4: this.groupTermInsurance.r1c4,
      r1c5: this.groupTermInsurance.r1c5,
      r1c6: this.groupTermInsurance.r1c6,
      r1c7: this.groupTermInsurance.r1c7,
      r2c2: this.groupTermInsurance.r2c2,
      r2c3: this.groupTermInsurance.r2c3,
      r2c4: this.groupTermInsurance.r2c4,
      r2c5: this.groupTermInsurance.r2c5,
      r2c6: this.groupTermInsurance.r2c6,
      r2c7: this.groupTermInsurance.r2c7,
      r3c2: this.groupTermInsurance.r3c2,
      r3c3: this.groupTermInsurance.r3c3,
      r3c4: this.groupTermInsurance.r3c4,
      r3c5: this.groupTermInsurance.r3c5,
      r3c6: this.groupTermInsurance.r3c6,
      r3c7: this.groupTermInsurance.r3c7,
      r4c2: this.groupTermInsurance.r4c2,
      r4c3: this.groupTermInsurance.r4c3,
      r4c4: this.groupTermInsurance.r4c4,
      r4c5: this.groupTermInsurance.r4c5,
      r4c6: this.groupTermInsurance.r4c6,
      r4c7: this.groupTermInsurance.r4c7,
      r5c2: this.groupTermInsurance.r5c2,
      r5c3: this.groupTermInsurance.r5c3,
      r5c4: this.groupTermInsurance.r5c4,
      r5c5: this.groupTermInsurance.r5c5,
      r5c6: this.groupTermInsurance.r5c6,
      r5c7: this.groupTermInsurance.r5c7,
      r6c2: this.groupTermInsurance.r6c2,
      r6c3: this.groupTermInsurance.r6c3,
      r6c4: this.groupTermInsurance.r6c4,
      r6c5: this.groupTermInsurance.r6c5,
      r6c6: this.groupTermInsurance.r6c6,
      r6c7: this.groupTermInsurance.r6c7,
      name1:
        this.personaldetails.firstname +
        ' ' +
        this.personaldetails.middlename +
        ' ' +
        this.personaldetails.lastname,
      name2: this.groupTermInsurance.name2,
      place: this.groupTermInsurance.place,
      erp: this.groupTermInsurance.erp,
      dob: this.personaldetails.dob,
      sex: this.personaldetails.gender,
      maritalstatus: this.personaldetails.maritalstatus,
      address:
        this.personaldetails.permanentaddress.houseNo +
        ' ' +
        this.personaldetails.permanentaddress.location +
        ' ' +
        this.personaldetails.permanentaddress.city +
        ' ' +
        this.personaldetails.permanentaddress.state,
      date: this.groupTermInsurance.date,
    });
  }

  defaultinitializeForm() {
    this.groupterm.patchValue({
      name:
        this.personaldetails.firstname +
        ' ' +
        this.personaldetails.middlename +
        ' ' +
        this.personaldetails.lastname,
      // r1c2:this.groupTermInsurance.r1c2,
      // r1c3:this.groupTermInsurance.r1c3,
      // r1c4:this.groupTermInsurance.r1c4,
      // r1c5:this.groupTermInsurance.r1c5,
      // r1c6:this.groupTermInsurance.r1c6,
      // r1c7:this.groupTermInsurance.r1c7,
      // r2c2:this.groupTermInsurance.r2c2,
      // r2c3:this.groupTermInsurance.r2c3,
      // r2c4:this.groupTermInsurance.r2c4,
      // r2c5:this.groupTermInsurance.r2c5,
      // r2c6:this.groupTermInsurance.r2c6,
      // r2c7:this.groupTermInsurance.r2c7,
      // r3c2:this.groupTermInsurance.r3c2,
      // r3c3:this.groupTermInsurance.r3c3,
      // r3c4:this.groupTermInsurance.r3c4,
      // r3c5:this.groupTermInsurance.r3c5,
      // r3c6:this.groupTermInsurance.r3c6,
      // r3c7:this.groupTermInsurance.r3c7,
      // r4c2:this.groupTermInsurance.r4c2,
      // r4c3:this.groupTermInsurance.r4c3,
      // r4c4:this.groupTermInsurance.r4c4,
      // r4c5:this.groupTermInsurance.r4c5,
      // r4c6:this.groupTermInsurance.r4c6,
      // r4c7:this.groupTermInsurance.r4c7,
      // r5c2:this.groupTermInsurance.r5c2,
      // r5c3:this.groupTermInsurance.r5c3,
      // r5c4:this.groupTermInsurance.r5c4,
      // r5c5:this.groupTermInsurance.r5c5,
      // r5c6:this.groupTermInsurance.r5c6,
      // r5c7:this.groupTermInsurance.r5c7,
      // r6c2:this.groupTermInsurance.r6c2,
      // r6c3:this.groupTermInsurance.r6c3,
      // r6c4:this.groupTermInsurance.r6c4,
      // r6c5:this.groupTermInsurance.r6c5,
      // r6c6:this.groupTermInsurance.r6c6,
      // r6c7:this.groupTermInsurance.r6c7,
      name1:
        this.personaldetails.firstname +
        ' ' +
        this.personaldetails.middlename +
        ' ' +
        this.personaldetails.lastname,
      // name2:this.groupTermInsurance.name2,
      // place:this.groupTermInsurance.place,
      // erp:this.groupTermInsurance.erp,
      // dob:this.personaldetails.dob,
      dob: this.personaldetails.dob,
      sex: this.personaldetails.gender,
      maritalstatus: this.personaldetails.maritalstatus,
      address:
        this.personaldetails.permanentaddress.houseNo +
        ' ' +
        this.personaldetails.permanentaddress.location +
        ' ' +
        this.personaldetails.permanentaddress.city +
        ' ' +
        this.personaldetails.permanentaddress.state,
      date:new Date(),
    });
  }
}
