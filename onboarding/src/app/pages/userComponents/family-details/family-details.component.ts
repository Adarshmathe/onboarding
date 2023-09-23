import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { FamilyService } from 'src/app/services/family.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { LoginService } from 'src/app/services/login.service';
import { family } from 'src/models/familyDetils';
import { formstatus } from 'src/models/formStatus';
import { user } from 'src/models/user';
import { gender, relations } from 'src/models/utils';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css'],
})
export class FamilyDetailsComponent implements OnInit {
  public user: user;
  public familyDetails: family;
  disabled: boolean = false;
  public gender = gender();
  public formStatusdetails: formstatus;
  public relations = relations();

  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'relation',
    'dob',
    'gender',
    'delete',
  ];
  dataSource: MatTableDataSource<family>;

  constructor(
    private fb: FormBuilder,
    private familyservice: FamilyService,
    private login: LoginService,
    private router: Router,
    private formstatus: FormStatusService,
    private loader: LoaderService,
    private toast: NgToastService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  @ViewChild(MatTable) table: MatTable<family>;

  family: FormGroup = this.fb.group({
    id: '',
    fuser: {},
    extras: this.fb.array([]),
  });

  ngOnInit(): void {
    this.user = this.login.getuser();
    this.getdetailsofuser();
    this.defaultfield();
    this.getFormStatus();
  }

  getFormStatus() {
    this.formstatus.getformstate(this.user.id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.formStatusdetails = data;
          if (this.formStatusdetails.family == '2') {
            this.family.disable();
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
    return this.family.get('extras') as FormArray;
  }

  defaultfield() {
    const g = this.fb.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      relation: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
    this.extras.push(g);
  }

  addfield() {
    const g = this.fb.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      relation: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
    this.extras.push(g);
    this.table.renderRows();
  }

  removefield(i) {
    this.extras.removeAt(i);
    this.table.renderRows();
  }

  save() {
    if (this.family.value.id == '') {
      this.family.value.fuser['id'] = this.user.id;
      this.loader.start();
      this.familyservice.savefamilydetails(this.family.getRawValue()).subscribe(
        (data: family) => {
          this.loader.stop();
          // console.log('save=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Family Details Saved',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/education']);
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
      this.familyservice
        .updatefamilydetails(this.family.getRawValue())
        .subscribe(
          (data: family) => {
            this.loader.stop();
            // console.log('update=>>>>>>' + data);
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Family Details Updated',
              duration: 3000,
            });
            this.router.navigate(['user-dashboard/education']);
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
  getdetailsofuser(): void {
    this.familyservice.getfamilydetailsbyuser(this.user.id).subscribe(
      (data: family) => {
        this.familyDetails = data;

        if (this.familyDetails != null) {
          for (let i = 0; i < this.familyDetails.extras.length - 1; i++) {
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
    this.family.patchValue({
      id: this.familyDetails.id,
      extras: this.familyDetails.extras,
      fuser: { id: this.familyDetails.fuser.id },
    });

    this.getFormStatus();
  }
}
