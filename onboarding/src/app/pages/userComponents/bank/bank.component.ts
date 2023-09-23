import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { BankdetailsService } from 'src/app/services/bankdetails.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { LoginService } from 'src/app/services/login.service';
import { checkMatchValidator } from 'src/app/services/validation';
import { bank } from 'src/models/bankDetails';
import { formstatus } from 'src/models/formStatus';
import { user } from 'src/models/user';
import { banks } from 'src/models/utils';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit {
  public user: user;
  public bankDetails: bank;
  private reader: FileReader;
  //fetch all banks name
  public banks = banks();
  formStatusdetails: formstatus;
  displayedColumns: string[] = [
    'bankname',
    'branchname',
    'bankaccountno',
    'confirmbankaccountno',
    'ifsccode',
    'confirmifsccode',
    'bankaddress',
    'upload',
  ];
  dataSource: MatTableDataSource<bank>;
  errormsg: string;

  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private bankservice: BankdetailsService,
    private router: Router,
    private formstatus: FormStatusService,
    private loader: LoaderService,
    private toast: NgToastService,
  ) {
    this.dataSource = new MatTableDataSource();
  }
  @ViewChild(MatTable) table: MatTable<bank>;

  bank: FormGroup = this.fb.group({
    id: '',
    buser: {},
    extras: this.fb.array([]),
  });

  // private matchValidator(controlValidationName: string): ValidatorFn {
  //   return (control: AbstractControl) => {
  //     const controlValidation = control.root.get(controlValidationName);
  //     if (!controlValidation) {
  //       return null;
  //     }
  //     return controlValidation.value !== control.value ?
  //       { matchValidator: { value: control.value } } : null;
  //   }
  // }

  matchValidator(controlValidationName: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (
        typeof control === 'undefined' ||
        control === null ||
        typeof control.value === 'undefined' ||
        control.value === null
      ) {
        return {
          required: true,
        };
      }

      const stateName: string = control.value.trim();
      var stateName2: string;
      let isPrimaryControl: AbstractControl = null;

      const parentFormGroup: FormGroup = <FormGroup>control.parent;

      if (typeof parentFormGroup !== 'undefined' && parentFormGroup !== null) {
        isPrimaryControl = (<FormGroup>control.parent).get(
          controlValidationName
        );
        stateName2 = isPrimaryControl.value;
      } else {
        // console.log('Parent control is undefined.');
      }

      if (
        typeof isPrimaryControl === 'undefined' ||
        isPrimaryControl === null ||
        typeof isPrimaryControl.value === 'undefined' ||
        isPrimaryControl.value === null
      ) {
        return {
          invalidFlag: true,
        };
      }
      return stateName !== stateName2
        ? { matchValidator: { value: control.value } }
        : null;
    };
  }

  bankaccountchange() {
    this.extras.at(0).patchValue({ confirmbankaccountno: '' });
  }

  ifsccodechange() {
    this.extras.at(0).patchValue({ confirmifsccode: '' });
  }

  defaultfield() {
    const g = this.fb.group(
      {
        bankname: ['', [Validators.required]],
        branchname: ['', [Validators.required]],
        bankaccountno: ['', [Validators.required]],
        confirmbankaccountno: [
          '',
          [Validators.required, this.matchValidator('bankaccountno')],
        ],
        ifsccode: ['', [Validators.required]],
        confirmifsccode: [
          '',
          [Validators.required, this.matchValidator('ifsccode')],
        ],
        bankaddress: ['', [Validators.required]],
        file: [''],
        filedata: [''],
        filename: [''],
        filetype: [''],
      },
      {
        validator: Validators.compose([
          checkMatchValidator('bankaccountno', 'confirmbankaccountno'),
          checkMatchValidator('ifsccode', 'confirmifsccode'),
        ]),
      }
    );
    this.extras.push(g);
  }

  ngOnInit(): void {
    this.user = this.login.getuser();
    this.getuser();
    this.defaultfield();
    this.getFormStatus();
  }

  get extras() {
    return this.bank.get('extras') as FormArray;
  }

  getFormStatus() {
    this.formstatus.getformstate(this.user.id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.formStatusdetails = data;
          if (this.formStatusdetails.bank == '2') {
            this.bank.disable();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Submit(): void {
    for (let a of this.extras.controls) {
      if (a.value.filetype == '') {
        a.get('file').setErrors({ invalid: true });
        this.errormsg = 'Please Upload File here';
        return;
      }
    }

    if (this.bank.value.id == '') {
      this.bank.value.buser['id'] = this.user.id;
      this.loader.start();
      this.bankservice.savebankdetails(this.bank.getRawValue()).subscribe(
        (data) => {
          this.loader.stop();
          // console.log('save=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Bank Details Saved',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/pf']);
          this.formstatus.formstatusSubject.next(true);
        },
        (error) => {
          this.loader.stop();
          this.toast.error({
            detail: 'Error',
            summary: error.message,
            duration: 3000,
          });
          console.log(error);
        }
      );
    } else {
      this.loader.start();
      this.bankservice.updatebankdetails(this.bank.getRawValue()).subscribe(
        (data) => {
          this.loader.stop();
          // console.log('update=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Bank Details Updated',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/pf']);
        },
        (error) => {
          this.loader.stop();
          this.toast.error({
            detail: 'Error',
            summary: error.message,
            duration: 3000,
          });
          console.log(error);
        }
      );
    }
  }

  getuser() {
    this.bankservice.getbankdetails(this.user.id).subscribe(
      (data: bank) => {
        this.bankDetails = data;
        if (this.bankDetails != null) {
          this.initializeForm();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initializeForm() {
    this.bank.patchValue({
      id: this.bankDetails.id,
      buser: { id: this.bankDetails.buser.id },
      extras: this.bankDetails.extras,
    });
  }

  onselectFile(e, index) {
    if (
      e.target.files[0].type.indexOf('image') == -1 &&
      e.target.files[0].type.indexOf('pdf') == -1
    ) {
      alert('Only (jpg, png, pdf) are allowed.');
      return;
    } else if (e.target.files[0].type.indexOf('pdf') != -1) {
      this.extras.at(index).patchValue({ filetype: 'pdf' });
    } else if (e.target.files[0].type.indexOf('image') != -1) {
      this.extras.at(index).patchValue({ filetype: 'image' });
    }
    this.extras.at(index).get('file').setErrors(null);
    this.reader = new FileReader();
    this.reader.readAsDataURL(e.target.files[0]);

    this.reader.onload = (event: any) => {
      this.extras.at(index).patchValue({ filedata: event.target.result });
    };
  }
}
