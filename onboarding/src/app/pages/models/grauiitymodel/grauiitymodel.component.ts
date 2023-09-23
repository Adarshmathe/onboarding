import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormStatusService } from 'src/app/services/form-status.service';
import { GratuityService } from 'src/app/services/gratuity.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { formstatus } from 'src/models/formStatus';
import { gratuityDetails } from 'src/models/GratuityDetails';
import { PersonalDetails } from 'src/models/personalDetails';
import { modeldata } from 'src/models/utils';

@Component({
  selector: 'app-grauiitymodel',
  templateUrl: './grauiitymodel.component.html',
  styleUrls: ['./grauiitymodel.component.css'],
})
export class GrauiitymodelComponent implements OnInit {
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  public userdata: gratuityDetails = new gratuityDetails();
  public url: String;
  public personaldetails: PersonalDetails = new PersonalDetails();
  constructor(
    private fb: FormBuilder,
    private PersonaldetailsService: PersonaldetailsService,
    private snack: MatSnackBar,
    private GratuityService: GratuityService,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private formstatusservice: FormStatusService,
    private toast: NgToastService
  ) {}

  // gratuity:FormGroup= this.fb.group({
  //   id:'',
  //   guser:{},
  //  name3:['',[Validators.required]],
  //  name:['',[Validators.required]],
  //  name1:['',[Validators.required]],
  //  r1c1:['',[Validators.required]],
  //  r1c2:['',[Validators.required]],
  //  r1c3:['',[Validators.required]],
  //  r1c4:['',[Validators.required]],
  //  r2c1:'',
  //  r2c2:'',
  //  r2c3:'',
  //  r2c4:'',
  //  r3c1:'',
  //  r3c2:'',
  //  r3c3:'',
  //  r3c4:'',
  //  nameofemployee:['',[Validators.required]],
  //  sex:['',[Validators.required]],
  //  religion:['',[Validators.required]],
  //  ismarried:['',[Validators.required]],
  //  department:['',[Validators.required]],
  //  ticket:['',[Validators.required]],
  //  date:['',[Validators.required]],
  //  village:['',[Validators.required]],
  //  thana:['',[Validators.required]],
  //  subdivision:['',[Validators.required]],
  //  postoffice:['',[Validators.required]],
  //  district:['',[Validators.required]],
  //  state:['',[Validators.required]],
  //  date1:['',[Validators.required]],
  //  place1:['',[Validators.required]],
  //  witness1:['',[Validators.required]],
  //  witness2:['',[Validators.required]],
  //  date2:['',[Validators.required]],
  //  place2:['',[Validators.required]],
  //  date3:['',[Validators.required]],
  //  date4:['',[Validators.required]],
  // })

  ngOnInit(): void {
    this.getpersonaldetails();
    this.getFormStatus(this.data.id);
    this.getuser();
  }

  getFormStatus(id) {
    this.formstatusservice.getformstate(id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.initialization(data);
          if (this.formStatusdetails.gratuity == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.gratuity == '2') {
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
      this.formStatusdetails.gratuity = '1';
    } else {
      this.formStatusdetails.gratuity = '2';
    }

    this.formstatusservice.updateformstate(this.formStatusdetails).subscribe(
      (data:formstatus) => {
        // console.log(data);
        // this.snack.open('SUCCESS','',{duration:3000,horizontalPosition: 'center',
        // verticalPosition: 'top'});
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
  //   if(this.gratuity.value.id==''){
  //     this.gratuity.value.guser['id'] = this.data.id;
  //     this.GratuityService.savegratuitydetails(this.gratuity.value).subscribe(
  //       (data)=>{
  //         console.log("save=>>>>>>"+data);

  //       }
  //         ,
  //         (error)=>{
  //           console.log(error);

  //         }
  //     )

  //   }else{
  //     this.GratuityService.updategratuitydetails(this.gratuity.value).subscribe(
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
    this.GratuityService.getgratuitydetails(this.data.id).subscribe(
      (data: gratuityDetails) => {
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
    this.userdata.name= this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
    this.userdata.nameofemployee= this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
    this.userdata.sex=this.personaldetails.gender,
    this.userdata.religion=this.personaldetails.religion,
    this.userdata.ismarried=this.personaldetails.maritalstatus,
    this.userdata.district=this.personaldetails.permanentaddress.district,
    this.userdata.state=this.personaldetails.permanentaddress.state
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
        
        this.getuser()
      }
    );
  }

  // initializeForm(){
  //   this.gratuity.patchValue({
  //     id:this.userdata.id,
  //     guser:{id:this.userdata.guser.id},
  //     name3:this.userdata.name3,
  //  name:this.userdata.name,
  //  name1:this.userdata.name1,
  //  r1c1:this.userdata.r1c1,
  //  r1c2:this.userdata.r1c2,
  //  r1c3:this.userdata.r1c3,
  //  r1c4:this.userdata.r1c4,
  //  r2c1:this.userdata.r2c1,
  //  r2c2:this.userdata.r2c2,
  //  r2c3:this.userdata.r2c3,
  //  r2c4:this.userdata.r2c4,
  //  r3c1:this.userdata.r3c1,
  //  r3c2:this.userdata.r3c2,
  //  r3c3:this.userdata.r3c3,
  //  r3c4:this.userdata.r3c4,
  //  nameofemployee:this.userdata.nameofemployee,
  //  sex:this.userdata.sex,
  //  religion:this.userdata.religion,
  //  ismarried:this.userdata.ismarried,
  //  department:this.userdata.department,
  //  ticket:this.userdata.ticket,
  //  date:this.userdata.date,
  //  village:this.userdata.village,
  //  thana:this.userdata.thana,
  //  subdivision:this.userdata.subdivision,
  //  postoffice:this.userdata.postoffice,
  //  district:this.userdata.district,
  //  state:this.userdata.state,
  //  date1:this.userdata.date1,
  //  place1:this.userdata.place1,
  //  witness1:this.userdata.witness1,
  //  witness2:this.userdata.witness2,
  //  date2:this.userdata.date2,
  //  place2:this.userdata.place2,
  //  date3:this.userdata.date3,
  //  date4:this.userdata.date4

  //   })
  // }
}
