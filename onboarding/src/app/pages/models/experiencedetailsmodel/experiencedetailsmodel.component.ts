import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ExperienceDetailsService } from 'src/app/services/experience-details.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { experience, extra } from 'src/models/experiansDetails';

import { formstatus } from 'src/models/formStatus';
import { modeldata } from 'src/models/utils';

@Component({
  selector: 'app-experiencedetailsmodel',
  templateUrl: './experiencedetailsmodel.component.html',
  styleUrls: ['./experiencedetailsmodel.component.css'],
})
export class ExperiencedetailsmodelComponent implements OnInit {
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  // public user: any;
  // public userdata:experience;

  displayedColumns: string[] = [
    'employer',
    'place',
    'industry',
    'designation',
    'fromDate',
    'toDate',
    'experience',
  ];
  dataSource: MatTableDataSource<extra>;

  constructor(
    private fb: FormBuilder,
    private Expservice: ExperienceDetailsService,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private formstatusservice: FormStatusService,
    private toast: NgToastService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  // @ViewChild(MatTable) table: MatTable<Experience>;

  // exp:FormGroup= this.fb.group({
  //   id:'',
  //   euser:{},
  //   extras:this.fb.array([])
  //   })

  ngOnInit(): void {
    this.getdetailsofuser(this.data.id);
    this.getFormStatus(this.data.id);
    // this.defaultfield();
  }

  getFormStatus(id) {
    this.formstatusservice.getformstate(id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.initialization(data);
          if (this.formStatusdetails.experience == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.experience == '2') {
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
      this.formStatusdetails.experience = '1';
    } else {
      this.formStatusdetails.experience = '2';
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

  // get extras(){
  //   return this.exp.get('extras') as FormArray;
  // }

  // defaultfield(){
  //   const g = this.fb.group({
  //     fromDate: ['',[Validators.required]],
  //     toDate: ['',[Validators.required]],
  //     employer:['',[Validators.required]],
  //     place:['',[Validators.required]],
  //     industry:['',[Validators.required]],
  //     designation:['',[Validators.required]],
  //     experience:['',[Validators.required]]
  //     })
  //     this.extras.push(g);

  // }

  // addfield(){
  //  const g = this.fb.group({
  //   fromDate: ['',[Validators.required]],
  //   toDate: ['',[Validators.required]],
  //   employer:['',[Validators.required]],
  //   place:['',[Validators.required]],
  //   industry:['',[Validators.required]],
  //   designation:['',[Validators.required]],
  //   experience:['',[Validators.required]],
  //   })
  //   this.extras.push(g);
  //   this.table.renderRows();
  // }

  // removefield(i){
  //   this.extras.removeAt(i);
  //   this.table.renderRows();
  // }

  //   save(){
  //     if(this.exp.value.id==''){
  //     this.exp.value.euser['id'] = this.data.id;

  //     this.Expservice.saveexpdetails(this.exp.value).subscribe(
  //       (data:any)=>{
  //         console.log("save=>>>>>>"+data);

  //       },
  //         (error)=>{
  //           console.log(error);
  //         }
  //     )

  // }else{
  //   this.Expservice.updateexpdetails(this.exp.value).subscribe(
  //     (data)=>{
  //       console.log("update=>>>>>>"+data);

  //     }
  //       ,
  //       (error)=>{
  //         console.log(error);

  //       }
  //   )
  // }
  // }
  getdetailsofuser(id) {
    this.Expservice.getdetailsofuser(id).subscribe(
      (data: experience) => {
        // this.userdata = data;
        this.dataSource = new MatTableDataSource(data.extras);
        // if(this.userdata != null){
        //   for (let i = 0; i < this.userdata.extras.length-1; i++) {
        //     this.addfield();
        //   }
        //   this.initializeForm();
        // }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // initializeForm(){
  //   this.exp.patchValue({
  //     id:this.userdata.id,
  //     extras:this.userdata.extras,
  //     euser:{id:this.userdata.euser.id}
  //   })

  // }

  // convertDateStringUrl(dataValue: Date): string {
  //   let value = moment(dataValue);
  //   let valueString = value.format('YYYY-MM-DD');
  //   return valueString;
  // }

  // dateChange(index){

  //   if(this.exp.get('extras').value[index].fromDate==null || this.exp.get('extras').value[index].toDate==null){
  //     return;
  //   }

  //   let dateFrom = new Date(this.exp.get('extras').value[index].fromDate);
  //   let dateTo = new Date(this.exp.get('extras').value[index].toDate);
  //   let months = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));

  //   if (months >= 12) {

  //     let year = (months - (months %12))/12
  //     let month = months-(year*12);

  //       this.extras.at(index).patchValue(
  //         {experience:year+" years "+month+" months"},
  //     )

  //   } else {

  //       this.extras.at(index).patchValue(
  //         {experience:months+" months"},
  //     )
  //   }
  // }
}
