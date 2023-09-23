import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { EmployeeConfidentialService } from 'src/app/services/employee-confidential.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { employeeconfidentialDetails } from 'src/models/EmployeConfidentialDetails';
import { PersonalDetails } from 'src/models/personalDetails';

@Component({
  selector: 'app-employee-confidential-agreement-download',
  templateUrl: './employee-confidential-agreement-download.component.html',
  styleUrls: ['./employee-confidential-agreement-download.component.css'],
})
export class EmployeeConfidentialAgreementDownloadComponent implements OnInit {
  @Input() id:Number;
  // public user: any;
  public userdata: employeeconfidentialDetails = new employeeconfidentialDetails();
  public personaldetails: PersonalDetails = new PersonalDetails();
  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private PersonaldetailsService: PersonaldetailsService,
    private EmployeeConfidentialService: EmployeeConfidentialService,
    private router: Router,
    private loader: LoaderService
  ) {}

  // empconfidential: FormGroup = this.fb.group({
  //   id: '',
  //   ecauser: {},
  //   name: ['', [Validators.required]],
  //   title1: ['', [Validators.required]],
  //   empno: ['', [Validators.required]],
  //   name4: ['', [Validators.required]],
  //   age: ['', [Validators.required]],
  //   resident: ['', [Validators.required]],
  //   name1: ['', [Validators.required]],
  //   office: ['', [Validators.required]],
  //   joiningdate: ['', [Validators.required]],
  //   appointmentdate: ['', [Validators.required]],
  //   name2: ['', [Validators.required]],
  //   employee: ['', [Validators.required]],
  //   witness: ['', [Validators.required]],
  //   name3: ['', [Validators.required]],
  //   title: ['', [Validators.required]],
  // });

  ngOnInit(): void {
    // this.user = this.login.getuser();
    this.getpersonaldetails();
  }

  getuser():void {
    this.loader.start();
    this.EmployeeConfidentialService.getemployeeconfidentialdetails(
      this.id
    ).subscribe(
      (data: employeeconfidentialDetails) => {
        this.loader.stop();
        this.userdata = data;
        this.loadMasterData();
        // if (this.userdata != null) {
        //   this.initializeForm();
        // }
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      }
    );
  }
  loadMasterData(){
    this.userdata.title1=
    this.personaldetails.firstname +
    ' ' +
    this.personaldetails.middlename +
    ' ' +
    this.personaldetails.lastname
  }

  getpersonaldetails() {
    this.PersonaldetailsService.get(this.id).subscribe(
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

  // initializeForm() {
  //   this.empconfidential.patchValue({
  //     id: this.userdata.id,
  //     ecauser: { id: this.userdata.ecauser.id },
  //     name: this.userdata.name,
  //     empno: this.userdata.empno,
  //     name4: this.userdata.name4,
  //     age: this.userdata.age,
  //     resident: this.userdata.resident,
  //     name1: this.userdata.name1,
  //     office: this.userdata.office,
  //     joiningdate: this.userdata.joiningdate,
  //     appointmentdate: this.userdata.appointmentdate,
  //     name2: this.userdata.name2,
  //     employee: this.userdata.employee,
  //     witness: this.userdata.witness,
  //     name3: this.userdata.name3,
  //     title: this.userdata.title,
  //     title1: this.userdata.title1,
  //   });
  // }
}
