import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeConfidentialService } from 'src/app/services/employee-confidential.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { employeeconfidentialDetails } from 'src/models/EmployeConfidentialDetails';
import { formstatus } from 'src/models/formStatus';
import { PersonalDetails } from 'src/models/personalDetails';
import { modeldata } from 'src/models/utils';

@Component({
  selector: 'app-employeeconfidentialadreement-model',
  templateUrl: './employeeconfidentialadreement-model.component.html',
  styleUrls: ['./employeeconfidentialadreement-model.component.css'],
})
export class EmployeeconfidentialadreementModelComponent implements OnInit {
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  public userdata: employeeconfidentialDetails = new employeeconfidentialDetails();
  public personaldetails: PersonalDetails;
  constructor(
    private fb: FormBuilder,
    private PersonaldetailsService: PersonaldetailsService,
    private snack: MatSnackBar,
    private EmployeeConfidentialService: EmployeeConfidentialService,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private formstatusservice: FormStatusService,
    private toast: NgToastService
  ) {}

  // empconfidential:FormGroup= this.fb.group({
  //   id:'',
  //   ecauser:{},
  //  name:'',
  //  title1:'',
  //  empno:'',
  //  name4:'',
  //  age:'',
  //  resident:'',
  //  name1:'',
  //  office:'',
  //  joiningdate:'',
  //  appointmentdate:'',
  //  name2:'',
  //  employee:'',
  //  witness:'',
  //  name3:'',
  //  title:''
  // })

  ngOnInit(): void {
    // this.getuser(this.data.id);
    this.getpersonaldetails();
    this.getFormStatus(this.data.id);
  }

  getFormStatus(id) {
    this.formstatusservice.getformstate(id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.initialization(data);
          if (this.formStatusdetails.employeeConfidentialityAgreement == '1') {
            this.checkbox = true;
          } else if (
            this.formStatusdetails.employeeConfidentialityAgreement == '2'
          ) {
            this.checkbox = false;
          } else {
            this.disable = true;
          }
        } else {
          this.disable = true;
        }
      },
      (error) => {
        console.log(error);
        this.disable = true;
      }
    );
  }

  getpersonaldetails() {
    this.PersonaldetailsService.get(this.data.id).subscribe(
      (data: PersonalDetails) => {
        this.personaldetails = data;
      },
      (error) => {
        console.log(error);
      },
      ()=>{
        this.getuser(this.data.id);
      }
    );
  }

  initialization(data: formstatus) {
    this.formStatusdetails = {
      id: data.id,
      personal: data.personal,
      family: data.family,
      education: data.education,

      experience: data.experience,
      bank: data.bank,
      provident: data.provident,
      gratuity: data.gratuity,
      employeeConfidentialityAgreement: data.employeeConfidentialityAgreement,
      groupMediclaim: data.groupMediclaim,
      groupTermInsurance: data.groupTermInsurance,
      nominationinPF: data.nominationinPF,
      codeOfConduct: data.codeOfConduct,
      formuser: { id: data.formuser.id },
    };
  }

  updateformstatus() {
    if (this.checkbox == true) {
      this.formStatusdetails.employeeConfidentialityAgreement = '1';
    } else {
      this.formStatusdetails.employeeConfidentialityAgreement = '2';
    }

    this.formstatusservice.updateformstate(this.formStatusdetails).subscribe(
      (data: formstatus) => {
        // this.snack.open('SUCCESS','',{duration:3000,horizontalPosition: 'center',
        // verticalPosition: 'top'});
        // console.log(data);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'saved',
          duration: 3000,
        });
      },
      (error) => {
        console.log(error);
        // this.snack.open('ERROR',error.message,{duration:3000,horizontalPosition: 'center',
        // verticalPosition: 'top'})
        this.toast.error({
          detail: 'Error',
          summary: error.message,
          duration: 3000,
        });
      }
    );
  }

  // Submit(){
  //   if(this.empconfidential.value.id==''){
  //     this.empconfidential.value.ecauser['id'] = this.data.id;
  //     this.EmployeeConfidentialService.saveemployeeconfidentialdetails(this.empconfidential.value).subscribe(
  //       (data)=>{
  //         console.log("save=>>>>>>"+data);
  //       }
  //         ,
  //         (error)=>{
  //           console.log(error);

  //         }
  //     )

  //   }else{
  //     this.EmployeeConfidentialService.updateemployeeconfidentialdetails(this.empconfidential.value).subscribe(
  //       (data)=>{
  //         console.log("update=>>>>>>"+data);
  //       }
  //         ,
  //         (error)=>{
  //           console.log(error);

  //         }
  //     )

  //   }

  //   }

  getuser(id) {
    this.EmployeeConfidentialService.getemployeeconfidentialdetails(
      id
    ).subscribe(
      (data: employeeconfidentialDetails) => {
        this.userdata = data;
        this.loadMasterData();
        // if(this.userdata != null){
        //   this.initializeForm();
        // }
      },
      (error) => {
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

  // getpersonaldetails(){
  //   this.PersonaldetailsService.get(this.data.id).subscribe(
  //     (data:any)=>{
  //       this.personaldetails = data;
  //       this.getuser();
  //     },
  //       (error)=>{
  //         console.log(error);
  //       }
  //       )
  // }

  // initializeForm(){
  //   this.empconfidential.patchValue({
  //     id:this.userdata.id,
  //     ecauser:{id:this.userdata.ecauser.id},
  //     name:this.userdata.name,
  //     empno:this.userdata.empno,
  //     name4:this.userdata.name4,
  //     age:this.userdata.age,
  //     resident:this.userdata.resident,
  //     name1:this.userdata.name1,
  //     office:this.userdata.office,
  //     joiningdate:this.userdata.joiningdate,
  //     appointmentdate:this.userdata.appointmentdate,
  //     name2:this.userdata.name2,
  //     employee:this.userdata.employee,
  //     witness:this.userdata.witness,
  //     name3:this.userdata.name3,
  //     title:this.userdata.title,
  //     title1:this.userdata.title1

  //   })
  // }
}
