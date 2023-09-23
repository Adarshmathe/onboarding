import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';
import { BankdetailsService } from 'src/app/services/bankdetails.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { userdocumenturl } from 'src/app/services/helper';
import { NominationInPfService } from 'src/app/services/nomination-in-pf.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { bank } from 'src/models/bankDetails';
import { formstatus } from 'src/models/formStatus';
import { nominationinPfDetails } from 'src/models/NominationInPf';
import { PersonalDetails } from 'src/models/personalDetails';
import { banks, modeldata } from 'src/models/utils';

@Component({
  selector: 'app-nominationinpf-model',
  templateUrl: './nominationinpf-model.component.html',
  styleUrls: ['./nominationinpf-model.component.css'],
})
export class NominationinpfModelComponent implements OnInit {
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  public userdata: nominationinPfDetails = new nominationinPfDetails();
  public personaldetails: PersonalDetails = new PersonalDetails();
  public bankdetails: bank;
  public url: String;
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private snack: MatSnackBar,
    private PersonaldetailsService: PersonaldetailsService,
    private bankservice: BankdetailsService,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private NominationInPfService: NominationInPfService,
    private formstatusservice: FormStatusService,
    private toast: NgToastService
  ) {}

  // nomination:FormGroup= this.fb.group({
  //   id:'',
  //   nuser:{},
  //  name:'',
  //  fathername:'',
  //  surname:'',
  //  dob:'',
  //  accountno:'',
  //  sex:'',
  //  marital:'',
  //  address:'',
  //  r2c1:'',
  //  r2c2:'',
  //  r2c3:'',
  //  r2c4:'',
  //  r2c5:'',
  //  r2c6:'',
  //  r3c1:'',
  //  r3c2:'',
  //  r3c3:'',
  //  r3c4:'',
  //  r3c5:'',
  //  r3c6:'',
  //  r4c1:'',
  //  r4c2:'',
  //  r4c3:'',
  //  r4c4:'',
  //  r4c5:'',
  //  r4c6:'',
  //  r5c1:'',
  //  r5c2:'',
  //  r5c3:'',
  //  r5c4:'',
  //  r5c5:'',
  //  r5c6:'',
  //  r6c1:'',
  //  r6c2:'',
  //  r6c3:'',
  //  r6c4:'',
  //  r6c5:'',
  //  r6c6:'',
  //  t1r2c1:'',
  //  t1r2c2:'',
  //  t1r2c3:'',
  //  t1r2c4:'',
  //  t1r3c1:'',
  //  t1r3c2:'',
  //  t1r3c3:'',
  //  t1r3c4:'',
  //  t1r4c1:'',
  //  t1r4c2:'',
  //  t1r4c3:'',
  //  t1r4c4:'',
  //  t1r5c1:'',
  //  t1r5c2:'',
  //  t1r5c3:'',
  //  t1r5c4:'',
  //  t1r6c1:'',
  //  t1r6c2:'',
  //  t1r6c3:'',
  //  t1r6c4:'',
  //  t2r1c1:'',
  //  t2r1c2:'',
  //  t2r1c3:'',
  //  t2r2c1:'',
  //  t2r2c2:'',
  //  t2r2c3:'',
  //  t2r3c1:'',
  //  t2r3c2:'',
  //  t2r3c3:'',
  //  t2r4c1:'',
  //  t2r4c2:'',
  //  t2r4c3:'',
  //  t2r5c1:'',
  //  t2r5c2:'',
  //  t2r5c3:'',
  //  date:'',
  //  name1:'',
  //  date1:''
  // })

  ngOnInit(): void {
    this.getpersonaldetails();
    this.getFormStatus(this.data.id);
    
  }

  getFormStatus(id) {
    this.formstatusservice.getformstate(id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.initialization(data);
          if (this.formStatusdetails.nominationinPF == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.nominationinPF == '2') {
            this.checkbox = false;
          } else {
            this.disable = true;
          }
        }else {
          this.disable = true;
        }
      },
      (error) => {
        console.log(error);
        this.disable = true;
      }
    );
  }
  

  loadMasterData(){
    this.userdata.name=
    this.personaldetails.firstname +
    ' ' +
    this.personaldetails.middlename +
    ' ' +
    this.personaldetails.lastname,
  this.userdata.surname= this.personaldetails.lastname,
  this.userdata.dob= this.personaldetails.dob,
  this.userdata.accountno = this.bankdetails.extras[0].bankaccountno,
  this.userdata.sex= this.personaldetails.gender,
  this.userdata.marital= this.personaldetails.maritalstatus,
  this.userdata.address=
    this.personaldetails.permanentaddress.houseNo +
    ' ' +
    this.personaldetails.permanentaddress.location +
    ' ' +
    this.personaldetails.permanentaddress.city +
    ' ' +
    this.personaldetails.permanentaddress.state
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
      this.formStatusdetails.nominationinPF = '1';
    } else {
      this.formStatusdetails.nominationinPF = '2';
    }

    this.formstatusservice.updateformstate(this.formStatusdetails).subscribe(
      (data:formstatus) => {
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
  //   if(this.nomination.value.id==''){
  //     this.nomination.value.nuser['id'] = this.data.id;
  //     this.NominationInPfService.savenominationinpfdetails(this.nomination.value).subscribe(
  //       (data)=>{
  //         console.log("save=>>>>>>"+data);

  //       }
  //         ,
  //         (error)=>{
  //           console.log(error);

  //         }
  //     )

  //   }else{
  //     this.NominationInPfService.updatenominationinpfdetails(this.nomination.value).subscribe(
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

  getuser():void {
    this.NominationInPfService.getnominationinpfdetails(this.data.id).subscribe(
      (data: nominationinPfDetails) => {
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

  getpersonaldetails() {
    this.PersonaldetailsService.get(this.data.id).subscribe(
      (data: PersonalDetails) => {
        this.personaldetails = data;
       
        this.url =
          userdocumenturl +
          this.data.id +
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
    this.bankservice.getbankdetails(this.data.id).subscribe(
      (data: bank) => {
        this.bankdetails = data;
        
      },
      (error) => {
        console.log(error);
      },
      ()=>{
        this.getuser();
      }
    );
  }

  // initializeForm(){
  //   this.nomination.patchValue({
  //     id:this.userdata.id,
  //     nuser:{id:this.userdata.nuser.id},
  //     name:this.userdata.name,
  //     fathername:this.userdata.fathername,
  //     surname:this.userdata.surname,
  //     dob:this.userdata.dob,
  //     accountno:this.userdata.accountno,
  //     sex:this.userdata.sex,
  //     marital:this.userdata.marital,
  //     address:this.userdata.address,
  //     r2c1:this.userdata.r2c1,
  //     r2c2:this.userdata.r2c2,
  //     r2c3:this.userdata.r2c3,
  //     r2c4:this.userdata.r2c4,
  //     r2c5:this.userdata.r2c5,
  //     r2c6:this.userdata.r2c6,
  //     r3c1:this.userdata.r3c1,
  //     r3c2:this.userdata.r3c2,
  //     r3c3:this.userdata.r3c3,
  //     r3c4:this.userdata.r3c4,
  //     r3c5:this.userdata.r3c5,
  //     r3c6:this.userdata.r3c6,
  //     r4c1:this.userdata.r4c1,
  //     r4c2:this.userdata.r4c2,
  //     r4c3:this.userdata.r4c3,
  //     r4c4:this.userdata.r4c4,
  //     r4c5:this.userdata.r4c5,
  //     r4c6:this.userdata.r4c6,
  //     r5c1:this.userdata.r5c1,
  //     r5c2:this.userdata.r5c2,
  //     r5c3:this.userdata.r5c3,
  //     r5c4:this.userdata.r5c4,
  //     r5c5:this.userdata.r5c5,
  //     r5c6:this.userdata.r5c6,
  //     r6c1:this.userdata.r6c1,
  //     r6c2:this.userdata.r6c2,
  //     r6c3:this.userdata.r6c3,
  //     r6c4:this.userdata.r6c4,
  //     r6c5:this.userdata.r6c5,
  //     r6c6:this.userdata.r6c6,
  //     t1r2c1:this.userdata.t1r2c1,
  //     t1r2c2:this.userdata.t1r2c2,
  //     t1r2c3:this.userdata.t1r2c3,
  //     t1r2c4:this.userdata.t1r2c4,
  //     t1r3c1:this.userdata.t1r3c1,
  //     t1r3c2:this.userdata.t1r3c2,
  //     t1r3c3:this.userdata.t1r3c3,
  //     t1r3c4:this.userdata.t1r3c4,
  //     t1r4c1:this.userdata.t1r4c1,
  //     t1r4c2:this.userdata.t1r4c2,
  //     t1r4c3:this.userdata.t1r4c3,
  //     t1r4c4:this.userdata.t1r4c4,
  //     t1r5c1:this.userdata.t1r5c1,
  //     t1r5c2:this.userdata.t1r5c2,
  //     t1r5c3:this.userdata.t1r5c3,
  //     t1r5c4:this.userdata.t1r5c4,
  //     t1r6c1:this.userdata.t1r6c1,
  //     t1r6c2:this.userdata.t1r6c2,
  //     t1r6c3:this.userdata.t1r6c3,
  //     t1r6c4:this.userdata.t1r6c4,
  //     t2r1c1:this.userdata.t2r1c1,
  //     t2r1c2:this.userdata.t2r1c2,
  //     t2r1c3:this.userdata.t2r1c3,
  //     t2r2c1:this.userdata.t2r2c1,
  //     t2r2c2:this.userdata.t2r2c2,
  //     t2r2c3:this.userdata.t2r2c3,
  //     t2r3c1:this.userdata.t2r3c1,
  //     t2r3c2:this.userdata.t2r3c2,
  //     t2r3c3:this.userdata.t2r3c3,
  //     t2r4c1:this.userdata.t2r4c1,
  //     t2r4c2:this.userdata.t2r4c2,
  //     t2r4c3:this.userdata.t2r4c3,
  //     t2r5c1:this.userdata.t2r5c1,
  //     t2r5c2:this.userdata.t2r5c2,
  //     t2r5c3:this.userdata.t2r5c3,
  //     date:this.userdata.date,
  //     name1:this.userdata.name1,
  //     date1:this.userdata.date1

  //   })
  // }
}
