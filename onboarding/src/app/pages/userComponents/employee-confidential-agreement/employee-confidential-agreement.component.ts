import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { EmployeeConfidentialService } from 'src/app/services/employee-confidential.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { AppValidation } from 'src/app/services/validation';
import { employeeconfidentialDetails } from 'src/models/EmployeConfidentialDetails';
import { formstatus } from 'src/models/formStatus';
import { PersonalDetails } from 'src/models/personalDetails';
import { user } from 'src/models/user';

@Component({
  selector: 'app-employee-confidential-agreement',
  templateUrl: './employee-confidential-agreement.component.html',
  styleUrls: ['./employee-confidential-agreement.component.css'],
})
export class EmployeeConfidentialAgreementComponent implements OnInit {
  public user: user;
  public employeconfidential: employeeconfidentialDetails;
  public formStatusdetails: formstatus;
  public personaldetails: PersonalDetails;
  private validation = new AppValidation();
  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private PersonaldetailsService: PersonaldetailsService,
    private EmployeeConfidentialService: EmployeeConfidentialService,
    private router: Router,
    private formstatus: FormStatusService,
    private loader: LoaderService,
    private toast: NgToastService,

  ) {}

  empconfidential: FormGroup = this.fb.group({
    id: '',
    ecauser: {},
    name: ['', [Validators.required]],
    title1: [{ value: '', disabled: true }, [Validators.required]],
    empno: ['', [Validators.required]],
    name4: ['', [Validators.required]],
    age: ['', [Validators.required]],
    resident: ['', [Validators.required]],
    name1: ['', [Validators.required]],
    office: ['', [Validators.required]],
    joiningdate: ['', [Validators.required]],
    appointmentdate: ['', [Validators.required]],
    name2: ['', [Validators.required]],
    employee: ['', [Validators.required]],
    witness: ['', [Validators.required]],
    name3: ['', [Validators.required]],
    title: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.user = this.login.getuser();
    this.getpersonaldetails();
    this.getFormStatus();
  
  }

  getFormStatus():void {
    this.formstatus.getformstate(this.user.id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.formStatusdetails = data;
          if (this.formStatusdetails.employeeConfidentialityAgreement == '2') {
            this.empconfidential.disable();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Submit():void {
    if (this.empconfidential.value.id == '') {
      this.empconfidential.value.ecauser['id'] = this.user.id;
      this.loader.start();
      this.EmployeeConfidentialService.saveemployeeconfidentialdetails(
        this.empconfidential.getRawValue()
      ).subscribe(
        (data: employeeconfidentialDetails) => {
          this.loader.stop();
          // console.log('save=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Saved',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/mediclaim']);
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
      this.EmployeeConfidentialService.updateemployeeconfidentialdetails(
        this.empconfidential.getRawValue()
      ).subscribe(
        (data: employeeconfidentialDetails) => {
          this.loader.stop();
          // console.log('update=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Updated',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/mediclaim']);
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

  _keyPress(event: any) {
    this.validation.allowedNumberOnly(event);
  }

  getuser():void {
    this.EmployeeConfidentialService.getemployeeconfidentialdetails(
      this.user.id
    ).subscribe(
      (data: employeeconfidentialDetails) => {
        this.employeconfidential = data;
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
      },
      (error) => {
        console.log(error);
      },
      ()=>{
        this.getuser();
      }
    );
  }

  initializeForm() {
    this.empconfidential.patchValue({
      id: this.employeconfidential.id,
      ecauser: { id: this.employeconfidential.ecauser.id },
      name: this.employeconfidential.name,
      empno: this.employeconfidential.empno,
      name4: this.employeconfidential.name4,
      age: this.employeconfidential.age,
      resident: this.employeconfidential.resident,
      name1: this.employeconfidential.name1,
      office: this.employeconfidential.office,
      joiningdate: this.employeconfidential.joiningdate,
      appointmentdate: this.employeconfidential.appointmentdate,
      name2: this.employeconfidential.name2,
      employee: this.employeconfidential.employee,
      witness: this.employeconfidential.witness,
      name3: this.employeconfidential.name3,
      title: this.employeconfidential.title,
      title1:
      this.personaldetails.firstname +
      ' ' +
      this.personaldetails.middlename +
      ' ' +
      this.personaldetails.lastname,
    });
  }

  defaultinitializeForm() {
    this.empconfidential.patchValue({
      // name:this.gratuityDetails.name,
      // empno:this.gratuityDetails.empno,
      // name4:this.gratuityDetails.name4,
      // age:this.gratuityDetails.age,
      // resident:this.gratuityDetails.resident,
      // name1:this.gratuityDetails.name1,
      // office:this.gratuityDetails.office,
      // joiningdate:this.gratuityDetails.joiningdate,
      // appointmentdate:this.gratuityDetails.appointmentdate,
      // name2:this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
      // employee:this.gratuityDetails.employee,
      // witness:this.gratuityDetails.witness,
      // name3:this.gratuityDetails.name3,
      // title:this.gratuityDetails.title,
      title1:
        this.personaldetails.firstname +
        ' ' +
        this.personaldetails.middlename +
        ' ' +
        this.personaldetails.lastname,
    });
  }
}
