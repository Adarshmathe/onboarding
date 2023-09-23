import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormStatusService } from 'src/app/services/form-status.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { MediclamService } from 'src/app/services/mediclam.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { formstatus } from 'src/models/formStatus';
import { mediclaimDetails } from 'src/models/MediclaimDetails';
import { PersonalDetails } from 'src/models/personalDetails';
import { modeldata } from 'src/models/utils';

@Component({
  selector: 'app-groupmediclaimmodel',
  templateUrl: './groupmediclaimmodel.component.html',
  styleUrls: ['./groupmediclaimmodel.component.css'],
})
export class GroupmediclaimmodelComponent implements OnInit {
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  public userdata: mediclaimDetails = new mediclaimDetails();
  public url: String;
  public personaldetails: PersonalDetails = new PersonalDetails();
  constructor(
    private fb: FormBuilder,
    private PersonaldetailsService: PersonaldetailsService,
    private snack: MatSnackBar,
    private MediclamService: MediclamService,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private formstatusservice: FormStatusService,
    private toast: NgToastService
  ) {}

  // mediclaim:FormGroup= this.fb.group({
  //   id:'',
  //   muser:{},
  //   name:['',[Validators.required]],
  //   management:['',[Validators.required]],
  //   email:['',[Validators.required]],
  //   address:['',[Validators.required]],
  //   mobile:['',[Validators.required]],
  //   erp:['',[Validators.required]],
  //   doj:['',[Validators.required]],
  //   dept:['',[Validators.required]],
  //   designation:['',[Validators.required]],
  //   alternateno:['',[Validators.required]],
  //  r1c2:'',
  //  r1c3:'',
  //  r1c4:'',
  //  r1c5:'',
  //  r1c6:'',
  //  r2c2:'',
  //  r2c3:'',
  //  r2c4:'',
  //  r2c5:'',
  //  r2c6:'',
  //  r3c2:'',
  //  r3c3:'',
  //  r3c4:'',
  //  r3c5:'',
  //  r3c6:'',
  //  r4c2:'',
  //  r4c3:'',
  //  r4c4:'',
  //  r4c5:'',
  //  r4c6:'',
  //  r5c2:'',
  //  r5c3:'',
  //  r5c4:'',
  //  r5c5:'',
  //  r5c6:'',
  //  r6c2:'',
  //  r6c3:'',
  //  r6c4:'',
  //  r6c5:'',
  //  r6c6:''

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
          if (this.formStatusdetails.groupMediclaim == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.groupMediclaim == '2') {
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
      this.formStatusdetails.groupMediclaim = '1';
    } else {
      this.formStatusdetails.groupMediclaim = '2';
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
  //   if(this.mediclaim.value.id==''){
  //     this.mediclaim.value.muser['id'] = this.data.id;
  //     this.MediclamService.savemediclaimdetails(this.mediclaim.value).subscribe(
  //       (data)=>{
  //         console.log("save=>>>>>>"+data);

  //       }
  //         ,
  //         (error)=>{
  //           console.log(error);

  //         }
  //     )

  //   }else{
  //     this.MediclamService.updatemediclaimdetails(this.mediclaim.value).subscribe(
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
    this.MediclamService.getmediclaimdetails(this.data.id).subscribe(
      (data: mediclaimDetails) => {
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
    this.userdata.name = this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
    this.userdata.email =this.personaldetails.email,
    this.userdata.address =this.personaldetails.permanentaddress.houseNo +" "+this.personaldetails.permanentaddress.location+" "+this.personaldetails.permanentaddress.city+" "+this.personaldetails.permanentaddress.state,
    this.userdata.mobile =this.personaldetails.contact
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
  //   this.mediclaim.patchValue({
  //     id:this.userdata.id,
  //     muser:{id:this.userdata.muser.id},
  //     name:this.userdata.name,
  //     management:this.userdata.management,
  //     email:this.userdata.email,
  //     address:this.userdata.address,
  //     mobile:this.userdata.mobile,
  //     erp:this.userdata.erp,
  //     doj:this.userdata.doj,
  //     dept:this.userdata.dept,
  //     designation:this.userdata.designation,
  //     alternateno:this.userdata.alternateno,
  //     r1c2:this.userdata.r1c2,
  //   r1c3:this.userdata.r1c3,
  //   r1c4:this.userdata.r1c4,
  //   r1c5:this.userdata.r1c5,
  //   r1c6:this.userdata.r1c6,
  //   r2c2:this.userdata.r2c2,
  //   r2c3:this.userdata.r2c3,
  //   r2c4:this.userdata.r2c4,
  //   r2c5:this.userdata.r2c5,
  //   r2c6:this.userdata.r2c6,
  //   r3c2:this.userdata.r3c2,
  //   r3c3:this.userdata.r3c3,
  //   r3c4:this.userdata.r3c4,
  //   r3c5:this.userdata.r3c5,
  //   r3c6:this.userdata.r3c6,
  //   r4c2:this.userdata.r4c2,
  //   r4c3:this.userdata.r4c3,
  //   r4c4:this.userdata.r4c4,
  //   r4c5:this.userdata.r4c5,
  //   r4c6:this.userdata.r4c6,
  //   r5c2:this.userdata.r5c2,
  //   r5c3:this.userdata.r5c3,
  //   r5c4:this.userdata.r5c4,
  //   r5c5:this.userdata.r5c5,
  //   r5c6:this.userdata.r5c6,
  //   r6c2:this.userdata.r6c2,
  //   r6c3:this.userdata.r6c3,
  //   r6c4:this.userdata.r6c4,
  //   r6c5:this.userdata.r6c5,
  //   r6c6:this.userdata.r6c6,

  //   })
  // }
}
