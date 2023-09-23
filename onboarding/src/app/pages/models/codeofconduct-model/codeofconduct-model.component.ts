import { Component, Inject, OnInit } from '@angular/core';
import { codeofconducturl } from 'src/app/services/helper';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CodeOfConductService } from 'src/app/services/code-of-conduct.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { LoginService } from 'src/app/services/login.service';
import { formstatus } from 'src/models/formStatus';
import { user } from 'src/models/user';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modeldata } from 'src/models/utils';
import { code0fconduct } from 'src/models/CodeOfCunduct';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-codeofconduct-model',
  templateUrl: './codeofconduct-model.component.html',
  styleUrls: ['./codeofconduct-model.component.css'],
})
export class CodeofconductModelComponent implements OnInit {
  //pdf path
  pdfSrc = codeofconducturl;
  // public user: user;
  public userdata: code0fconduct = new code0fconduct();
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  // coc:FormGroup= this.fb.group({
  //   id:'',
  //   cocuser:{},
  //   checkbox:['',[Validators.requiredTrue]],

  // })

  constructor(
    private fb: FormBuilder,
    private coc_service: CodeOfConductService,
    private snack: MatSnackBar,
    private login: LoginService,
    private toast: NgToastService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private formstatusservice: FormStatusService
  ) {}

  ngOnInit(): void {
    // this.user = this.login.getuser();
    this.getuser();
    this.getFormStatus(this.data.id);
  }

  getFormStatus(id) {
    this.formstatusservice.getformstate(id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.initialization(data);
          if (this.formStatusdetails.codeOfConduct == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.codeOfConduct == '2') {
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
      this.formStatusdetails.codeOfConduct = '1';
    } else {
      this.formStatusdetails.codeOfConduct = '2';
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

  //   Submit(){
  //     if(this.coc.value.id==''){
  //       this.coc.value.cocuser['id'] = this.user.id;
  //       this.coc_service.savecocdetails(this.coc.getRawValue()).subscribe(
  //         (data)=>{
  //           console.log("save=>>>>>>"+data);
  //           this.formstatus.formstatusSubject.next(true);
  //           // this.router.navigate(['user-dashboard/insurance']);
  //         }
  //           ,
  //           (error)=>{
  //             console.log(error);

  //           })

  //     }else{
  //       this.coc_service.updatecocdetails(this.coc.getRawValue()).subscribe(
  //         (data)=>{
  //           console.log("update=>>>>>>"+data);
  //           // this.router.navigate(['user-dashboard/insurance']);
  //         }
  //           ,
  //           (error)=>{
  //             console.log(error);

  //           }
  //       )}
  // }

  getuser():void {
    this.coc_service.getdetailsofcoc(this.data.id).subscribe(
      (data: code0fconduct) => {
        this.userdata = data;
        // console.log(data);

        // if(this.userdata != null){
        //   this.initializeForm();
        // }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // initializeForm(){
  //   this.coc.patchValue({
  //     id:this.userdata.id,
  //     cocuser:{id:this.userdata.cocuser.id},
  //     checkbox:this.userdata.checkbox,
  //   })
  // }
}
