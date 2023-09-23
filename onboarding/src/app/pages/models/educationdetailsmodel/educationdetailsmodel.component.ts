import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { EducationDetailsService } from 'src/app/services/education-details.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { education, extra } from 'src/models/educationDetails';
import { formstatus } from 'src/models/formStatus';
import { modeldata } from 'src/models/utils';

import { PreviewModelComponent } from '../preview-model/preview-model.component';

@Component({
  selector: 'app-educationdetailsmodel',
  templateUrl: './educationdetailsmodel.component.html',
  styleUrls: ['./educationdetailsmodel.component.css'],
})
export class EducationdetailsmodelComponent implements OnInit {
  // public user: any;
  // public userdata:education;
  // public courses = courses();
  // private reader: FileReader;
  formStatusdetails: formstatus = new formstatus();

  checkbox: boolean = false;
  disable: boolean = false;
  displayedColumns: string[] = [
    'course',
    'branch',
    'school_Institute',
    'board_university',
    'fromDate',
    'toDate',
    'noOfYears',
    'cgpa',
    'document',
  ];
  dataSource: MatTableDataSource<extra>;

  constructor(
    private fb: FormBuilder,
    private educationservice: EducationDetailsService,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    public dialog: MatDialog,
    private toast: NgToastService,
    private formstatusservice: FormStatusService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  //  @ViewChild(MatTable) table: MatTable<Qualification>;

  // education:FormGroup = this.fb.group({
  //   id:'',
  //   eduuser:{},
  //   extras:this.fb.array([])
  //   })

  ngOnInit(): void {
    this.getdetailsofeducation(this.data.id);
    this.getFormStatus(this.data.id);
    // this.defaultfield();
  }

  getFormStatus(id):void {
    this.formstatusservice.getformstate(id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.initialization(data);
          if (this.formStatusdetails.education == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.education == '2') {
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
      this.formStatusdetails.education = '1';
    } else {
      this.formStatusdetails.education = '2';
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

  // get extras(){
  //   return this.education.get('extras') as FormArray;
  // }

  // defaultfield(){
  //   const g = this.fb.group({
  //     course:['',[Validators.required]],
  //     branch:['',[Validators.required]],
  //     school_Institute:['',[Validators.required]],
  //     board_university:['',[Validators.required]],
  //     fromDate: ['',[Validators.required]],
  //     toDate: ['',[Validators.required]],
  //     noOfYears:['',[Validators.required]],
  //     cgpa:['',[Validators.required]],
  //     file:['',[Validators.required]],
  //     filedata:[''],
  //     filename:[''],
  //     filetype:['']
  //     })
  //     this.extras.push(g);

  // }

  // addfield(){
  //  const g = this.fb.group({
  //   course:['',[Validators.required]],
  //   branch:['',[Validators.required]],
  //   school_Institute:['',[Validators.required]],
  //   board_university:['',[Validators.required]],
  //   fromDate: ['',[Validators.required]],
  //   toDate: ['',[Validators.required]],
  //   noOfYears:['',[Validators.required]],
  //   cgpa:['',[Validators.required]],
  //   file:['',[Validators.required]],
  //   filedata:[''],
  //   filename:[''],
  //   filetype:['']
  //   })
  //   this.extras.push(g);
  //   this.table.renderRows();
  // }

  // removefield(i){
  //   this.extras.removeAt(i);
  //   this.table.renderRows();
  // }

  //   save(){
  //     if(this.education.value.id==''){
  //     this.education.value.eduuser['id'] = this.data.id;

  //     this.educationservice.saveedudetails(this.education.value).subscribe(
  //       (data:any)=>{
  //         console.log("save=>>>>>>"+data);

  //       },
  //         (error)=>{
  //           console.log(error);
  //         }
  //     )

  // }else{
  //   this.educationservice.updateedudetails(this.education.value).subscribe(
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
  getdetailsofeducation(id) {
    this.educationservice.getdetailsofeducation(id).subscribe(
      (data: education) => {
        // this.userdata = data;
        this.dataSource = new MatTableDataSource(data.extras);
        // console.log(data);

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
  //   this.education.patchValue({
  //     id:this.userdata.id,
  //     extras:this.userdata.extras,
  //     eduuser:{id:this.userdata.eduuser.id}
  //   })

  // }

  //   dateChange(index){

  //     if(this.education.get('extras').value[index].fromDate==null || this.education.get('extras').value[index].toDate==null){
  //       return;
  //     }

  //     let dateFrom = new Date(this.education.get('extras').value[index].fromDate);
  //     let dateTo = new Date(this.education.get('extras').value[index].toDate);
  //     let months = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));

  //     if (months >= 12) {

  //       let year = (months - (months %12))/12
  //       let month = months-(year*12);

  //         this.extras.at(index).patchValue(
  //           {noOfYears:year+" years "+month+" months"},
  //       )

  //     } else {

  //         this.extras.at(index).patchValue(
  //           {noOfYears:months+" months"},
  //       )
  //     }
  // }

  // onselectFile(e,index){

  //   if (e.target.files[0].type.indexOf('image') == -1 && e.target.files[0].type.indexOf('pdf') == -1) {
  //     alert('Only (jpg, png, pdf) are allowed.');
  //     return;
  //   }else if(e.target.files[0].type.indexOf('pdf') != -1) {
  //      this.extras.at(index).patchValue(
  //       {filetype:"pdf"},
  //     )

  //   }else if(e.target.files[0].type.indexOf('image') != -1) {
  //      this.extras.at(index).patchValue(
  //       {filetype: "image"},
  //     )
  //   }

  //   this.reader = new FileReader();
  //   this.reader.readAsDataURL(e.target.files[0]);

  // this.reader.onload= (event:any)=>{
  //   this.extras.at(index).patchValue(
  //     {filedata:event.target.result},
  // )
  // }
  //   }

  viewdialog(filetype, filename) {
    const dialogRef = this.dialog.open(PreviewModelComponent, {
      width: '1000px',
      data: {
        id: this.data.id,
        filetype: filetype,
        filename: filename,
        title: 'View',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }
}
