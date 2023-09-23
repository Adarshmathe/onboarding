import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';
import { FormStatusService } from 'src/app/services/form-status.service';
import { GroupTermInsuranceService } from 'src/app/services/group-term-insurance.service';
import { userdocumenturl } from 'src/app/services/helper';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { formstatus } from 'src/models/formStatus';
import { groupInsuranceDetails } from 'src/models/GroupTermInsurance';
import { PersonalDetails } from 'src/models/personalDetails';
import { modeldata } from 'src/models/utils';

@Component({
  selector: 'app-groupterminsurance-model',
  templateUrl: './groupterminsurance-model.component.html',
  styleUrls: ['./groupterminsurance-model.component.css'],
})
export class GroupterminsuranceModelComponent implements OnInit {
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  public userdata: groupInsuranceDetails = new groupInsuranceDetails();
  public url: String;
  public personaldetails: PersonalDetails = new PersonalDetails();
  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
    public datepipe: DatePipe,
    private PersonaldetailsService: PersonaldetailsService,
    private GroupTermInsuranceService: GroupTermInsuranceService,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private formstatusservice: FormStatusService,
    private toast: NgToastService
  ) {}

  // groupterm:FormGroup= this.fb.group({
  //  id:'',
  //  gtiuser:{},
  //  name:['',[Validators.required]],
  //  name2:['',[Validators.required]],
  //  r1c2:'',
  //  r1c3:'',
  //  r1c4:'',
  //  r1c5:'',
  //  r1c6:'',
  //  r1c7:'',
  //  r2c2:'',
  //  r2c3:'',
  //  r2c4:'',
  //  r2c5:'',
  //  r2c6:'',
  //  r2c7:'',
  //  r3c2:'',
  //  r3c3:'',
  //  r3c4:'',
  //  r3c5:'',
  //  r3c6:'',
  //  r3c7:'',
  //  r4c2:'',
  //  r4c3:'',
  //  r4c4:'',
  //  r4c5:'',
  //  r4c6:'',
  //  r4c7:'',
  //  r5c2:'',
  //  r5c3:'',
  //  r5c4:'',
  //  r5c5:'',
  //  r5c6:'',
  //  r5c7:'',
  //  r6c2:'',
  //  r6c3:'',
  //  r6c4:'',
  //  r6c5:'',
  //  r6c6:'',
  //  r6c7:'',
  //  name1:['',[Validators.required]],
  //  place:['',[Validators.required]],
  //  erp:['',[Validators.required]],
  //  dob:['',[Validators.required]],
  //  sex:['',[Validators.required]],
  //  maritalstatus:['',[Validators.required]],
  //  address:['',[Validators.required]],
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
          if (this.formStatusdetails.groupTermInsurance == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.groupTermInsurance == '2') {
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
      this.formStatusdetails.groupTermInsurance = '1';
    } else {
      this.formStatusdetails.groupTermInsurance = '2';
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
  //   if(this.groupterm.value.id==''){
  //     this.groupterm.value.gtiuser['id'] = this.data.id;
  //     this.GroupTermInsuranceService.savegroupterminsurancedetails(this.groupterm.value).subscribe(
  //       (data)=>{
  //         console.log("save=>>>>>>"+data);

  //       }
  //         ,
  //         (error)=>{
  //           console.log(error);

  //         }
  //     )

  //   }else{
  //     this.GroupTermInsuranceService.updategroupterminsurancedetails(this.groupterm.value).subscribe(
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

  getuser() {
    this.GroupTermInsuranceService.getgroupterminsurancedetails(
      this.data.id
    ).subscribe(
      (data: groupInsuranceDetails) => {
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
    this.userdata.name=
    this.personaldetails.firstname +
    ' ' +
    this.personaldetails.middlename +
    ' ' +
    this.personaldetails.lastname,
    this.userdata.name1=
    this.personaldetails.firstname +
    ' ' +
    this.personaldetails.middlename +
    ' ' +
    this.personaldetails.lastname,
    this.userdata.dob = this.personaldetails.dob,
    this.userdata.sex = this.personaldetails.gender,
    this.userdata.maritalstatus = this.personaldetails.maritalstatus,
    this.userdata.address =
      this.personaldetails.permanentaddress.houseNo +
      ' ' +
      this.personaldetails.permanentaddress.location +
      ' ' +
      this.personaldetails.permanentaddress.city +
      ' ' +
      this.personaldetails.permanentaddress.state
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
      },()=>{
        this.getuser();
      }
    );
  }

  // initializeForm(){
  //   this.groupterm.patchValue({
  //   id:this.userdata.id,
  //   gtiuser:{id:this.userdata.gtiuser.id},
  //   name:this.userdata.name,
  //   r1c2:this.userdata.r1c2,
  //   r1c3:this.userdata.r1c3,
  //   r1c4:this.userdata.r1c4,
  //   r1c5:this.userdata.r1c5,
  //   r1c6:this.userdata.r1c6,
  //   r1c7:this.userdata.r1c7,
  //   r2c2:this.userdata.r2c2,
  //   r2c3:this.userdata.r2c3,
  //   r2c4:this.userdata.r2c4,
  //   r2c5:this.userdata.r2c5,
  //   r2c6:this.userdata.r2c6,
  //   r2c7:this.userdata.r2c7,
  //   r3c2:this.userdata.r3c2,
  //   r3c3:this.userdata.r3c3,
  //   r3c4:this.userdata.r3c4,
  //   r3c5:this.userdata.r3c5,
  //   r3c6:this.userdata.r3c6,
  //   r3c7:this.userdata.r3c7,
  //   r4c2:this.userdata.r4c2,
  //   r4c3:this.userdata.r4c3,
  //   r4c4:this.userdata.r4c4,
  //   r4c5:this.userdata.r4c5,
  //   r4c6:this.userdata.r4c6,
  //   r4c7:this.userdata.r4c7,
  //   r5c2:this.userdata.r5c2,
  //   r5c3:this.userdata.r5c3,
  //   r5c4:this.userdata.r5c4,
  //   r5c5:this.userdata.r5c5,
  //   r5c6:this.userdata.r5c6,
  //   r5c7:this.userdata.r5c7,
  //   r6c2:this.userdata.r6c2,
  //   r6c3:this.userdata.r6c3,
  //   r6c4:this.userdata.r6c4,
  //   r6c5:this.userdata.r6c5,
  //   r6c6:this.userdata.r6c6,
  //   r6c7:this.userdata.r6c7,
  //   name1:this.userdata.name1,
  //   name2:this.userdata.name2,
  //   place:this.userdata.place,
  //   erp:this.userdata.erp,
  //   dob:this.userdata.dob,
  //   sex:this.userdata.sex,
  //   maritalstatus:this.userdata.maritalstatus,
  //   address:this.userdata.address

  //   })
  // }
}
