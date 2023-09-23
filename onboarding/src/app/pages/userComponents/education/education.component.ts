import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { EducationDetailsService } from 'src/app/services/education-details.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { LoginService } from 'src/app/services/login.service';
import { AppValidation } from 'src/app/services/validation';
import { education } from 'src/models/educationDetails';
import { formstatus } from 'src/models/formStatus';
import { user } from 'src/models/user';
import { courses } from 'src/models/utils';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  public user: user;
  public educationDetails: education;
  formStatusdetails: formstatus;
  disabled: boolean = false;
  public courses = courses();
  private validation = new AppValidation();
  private reader: FileReader;
  displayedColumns: string[] = [
    'course',
    'branch',
    'school_Institute',
    'board_university',
    'fromDate',
    'toDate',
    'noOfYears',
    'cgpa',
    'upload',
    'delete',
  ];
  dataSource: MatTableDataSource<education>;
  errormsg: string;
  errormsg1: string;

  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private router: Router,
    private educationservice: EducationDetailsService,
    private formstatus: FormStatusService,
    private loader: LoaderService,
    private toast: NgToastService,

  ) {
    this.dataSource = new MatTableDataSource();
  }

  @ViewChild(MatTable) table: MatTable<education>;

  education: FormGroup = this.fb.group({
    id: '',
    eduuser: {},
    extras: this.fb.array([]),
  });

  ngOnInit(): void {
    this.user = this.login.getuser();
    this.getdetailsofeducation();
    this.defaultfield();
    this.getFormStatus();
  }

  getFormStatus() {
    this.formstatus.getformstate(this.user.id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.formStatusdetails = data;
          if (this.formStatusdetails.education == '2') {
            this.education.disable();
            this.disabled = true;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get extras() {
    return this.education.get('extras') as FormArray;
  }

  defaultfield() {
    const g = this.fb.group({
      course: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      school_Institute: ['', [Validators.required]],
      board_university: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      noOfYears: ['', [Validators.required]],
      cgpa: ['', [Validators.required]],
      file: [''],
      filedata: [''],
      filename: [''],
      filetype: [''],
    });
    this.extras.push(g);
  }

  addfield() {
    const g = this.fb.group({
      course: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      school_Institute: ['', [Validators.required]],
      board_university: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      noOfYears: ['', [Validators.required]],
      cgpa: ['', [Validators.required]],
      file: [''],
      filedata: [''],
      filename: [''],
      filetype: [''],
    });
    this.extras.push(g);
    this.table.renderRows();
  }

  removefield(i) {
    this.extras.removeAt(i);
    this.table.renderRows();
  }

  save() {
    for (let a of this.extras.controls) {
      if (a.value.filetype == '') {
        a.get('file').setErrors({ invalid: true });
        this.errormsg = 'Please Upload File here';
        return;
      }
    }

    if (this.education.value.id == '') {
      this.education.value.eduuser['id'] = this.user.id;
      this.loader.start();
      this.educationservice
        .saveedudetails(this.education.getRawValue())
        .subscribe(
          (data: education) => {
            this.loader.stop();
            // console.log('save=>>>>>>' + data);
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Education Details Saved',
              duration: 3000,
            });
            this.router.navigate(['user-dashboard/experience']);
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
      this.educationservice
        .updateedudetails(this.education.getRawValue())
        .subscribe(
          (data: education) => {
            this.loader.stop();
            // console.log('update=>>>>>>' + data);
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Education Details Updated',
              duration: 3000,
            });
            this.router.navigate(['user-dashboard/experience']);
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
  getdetailsofeducation() {
    this.educationservice.getdetailsofeducation(this.user.id).subscribe(
      (data: education) => {
        this.educationDetails = data;
        if (this.educationDetails != null) {
          for (let i = 0; i < this.educationDetails.extras.length - 1; i++) {
            this.addfield();
          }
          this.initializeForm();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  initializeForm() {
    this.education.patchValue({
      id: this.educationDetails.id,
      extras: this.educationDetails.extras,
      eduuser: { id: this.educationDetails.eduuser.id },
    });
    this.getFormStatus();
  }

  dateChange(index) {
    this.extras.at(index).get('toDate').setErrors(null);
    this.extras.at(index).get('fromDate').setErrors(null);

    if (
      this.education.get('extras').value[index].fromDate == '' ||
      this.education.get('extras').value[index].toDate == ''
    ) {
      return;
    }
    let todate = new Date(this.education.get('extras').value[index].fromDate);
    let fromdate = new Date(this.education.get('extras').value[index].toDate);

    if (todate >= fromdate) {
      this.extras.at(index).get('toDate').setErrors({ invalid: true });
      this.extras.at(index).get('fromDate').setErrors({ invalid: true });
      this.errormsg1 = 'FromDate should be Greater than To Date';
      return;
    }

    let dateFrom = new Date(this.education.get('extras').value[index].fromDate);
    let dateTo = new Date(this.education.get('extras').value[index].toDate);
    let months =
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear());

    if (months >= 12) {
      let year = (months - (months % 12)) / 12;
      let month = months - year * 12;

      this.extras
        .at(index)
        .patchValue({ noOfYears: year + ' years ' + month + ' months' });
    } else {
      this.extras.at(index).patchValue({ noOfYears: months + ' months' });
    }
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

  _keyPress(event: any) {
    this.validation.checkCGPA(event);
  }
}
