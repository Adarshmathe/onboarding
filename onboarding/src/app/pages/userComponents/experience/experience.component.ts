import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { ExperienceDetailsService } from 'src/app/services/experience-details.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { LoginService } from 'src/app/services/login.service';
import { experience } from 'src/models/experiansDetails';
import { formstatus } from 'src/models/formStatus';
import { user } from 'src/models/user';
// import * as moment from 'moment'
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  public user: user;
  public experienceDetails: experience;
  public formStatusdetails: formstatus;
  public disabled: boolean = false;
  displayedColumns: string[] = [
    'employer',
    'place',
    'industry',
    'designation',
    'fromDate',
    'toDate',
    'experience',
    'delete',
  ];
  dataSource: MatTableDataSource<experience>;
  errormsg: string;

  constructor(
    private fb: FormBuilder,
    private Expservice: ExperienceDetailsService,
    private login: LoginService,
    private router: Router,
    private formstatus: FormStatusService,
    private loader: LoaderService,
    private toast: NgToastService,

  ) {
    this.dataSource = new MatTableDataSource();
  }

  @ViewChild(MatTable) table: MatTable<experience>;

  exp: FormGroup = this.fb.group({
    id: '',
    euser: {},
    extras: this.fb.array([]),
  });

  ngOnInit(): void {
    this.user = this.login.getuser();
    this.getexperienceDetails();
    this.defaultfield();
    this.getFormStatus();
  }

  getFormStatus() {
    this.formstatus.getformstate(this.user.id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.formStatusdetails = data;
          if (this.formStatusdetails.experience == '2') {
            this.exp.disable();
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
    return this.exp.get('extras') as FormArray;
  }

  defaultfield() {
    const g = this.fb.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      employer: ['', [Validators.required]],
      place: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      experience: ['', [Validators.required]],
    });
    this.extras.push(g);
  }

  addfield() {
    const g = this.fb.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      employer: ['', [Validators.required]],
      place: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      experience: ['', [Validators.required]],
    });
    this.extras.push(g);
    this.table.renderRows();
  }

  removefield(i) {
    this.extras.removeAt(i);
    this.table.renderRows();
  }

  save() {
    if (this.exp.value.id == '') {
      this.exp.value.euser['id'] = this.user.id;
      this.loader.start();
      this.Expservice.saveexpdetails(this.exp.getRawValue()).subscribe(
        (data: experience) => {
          this.loader.stop();
          // console.log('save=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Saved',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/bank']);
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
      this.Expservice.updateexpdetails(this.exp.getRawValue()).subscribe(
        (data: experience) => {
          this.loader.stop();
          // console.log('update=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Updated',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/bank']);
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
  getexperienceDetails(): void {
    this.Expservice.getdetailsofuser(this.user.id).subscribe(
      (data: experience) => {
        this.experienceDetails = data;

        if (this.experienceDetails != null) {
          for (let i = 0; i < this.experienceDetails.extras.length - 1; i++) {
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
    this.exp.patchValue({
      id: this.experienceDetails.id,
      extras: this.experienceDetails.extras,
      euser: { id: this.experienceDetails.euser.id },
    });
    this.getFormStatus();
  }

  // convertDateStringUrl(dataValue: Date): string {
  //   let value = moment(dataValue);
  //   let valueString = value.format('YYYY-MM-DD');
  //   return valueString;
  // }

  dateChange(index) {
    this.extras.at(index).get('toDate').setErrors(null);
    this.extras.at(index).get('fromDate').setErrors(null);

    if (
      this.exp.get('extras').value[index].fromDate == '' ||
      this.exp.get('extras').value[index].toDate == ''
    ) {
      return;
    }

    let todate = new Date(this.exp.get('extras').value[index].fromDate);
    let fromdate = new Date(this.exp.get('extras').value[index].toDate);

    if (todate >= fromdate) {
      this.extras.at(index).get('toDate').setErrors({ invalid: true });
      this.extras.at(index).get('fromDate').setErrors({ invalid: true });
      this.errormsg = 'FromDate should be Greater than To Date';
      return;
    }

    let dateFrom = new Date(this.exp.get('extras').value[index].fromDate);
    let dateTo = new Date(this.exp.get('extras').value[index].toDate);

    let months =
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear());

    if (months >= 12) {
      let year = (months - (months % 12)) / 12;
      let month = months - year * 12;

      this.extras
        .at(index)
        .patchValue({ experience: year + ' years ' + month + ' months' });
    } else {
      this.extras.at(index).patchValue({ experience: months + ' months' });
    }
  }
}
