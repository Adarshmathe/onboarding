import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { BankdetailsService } from 'src/app/services/bankdetails.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { checkMatchValidator } from 'src/app/services/validation';
import { bank, extra } from 'src/models/bankDetails';
import { formstatus } from 'src/models/formStatus';
import { user } from 'src/models/user';
import { modeldata } from 'src/models/utils';
import { PreviewModelComponent } from '../preview-model/preview-model.component';

@Component({
  selector: 'app-bankdetailsmodel',
  templateUrl: './bankdetailsmodel.component.html',
  styleUrls: ['./bankdetailsmodel.component.css'],
})
export class BankdetailsmodelComponent implements OnInit {
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  // public user: any;
  // public userdata:bank;
  // private reader: FileReader;
  // public banks = banks();

  displayedColumns: string[] = [
    'bankname',
    'branchname',
    'bankaccountno',
    'ifsccode',
    'bankaddress',
    'document',
  ];
  dataSource: MatTableDataSource<extra>;

  constructor(
    private fb: FormBuilder,
    private bankservice: BankdetailsService,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    public dialog: MatDialog,
    private formstatusservice: FormStatusService, private toast: NgToastService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getuser(this.data.id);
    this.getFormStatus(this.data.id);
    //  this.defaultfield();
  }

  getFormStatus(id) {
    this.formstatusservice.getformstate(id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.initialization(data);
          if (this.formStatusdetails.bank == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.bank == '2') {
            this.checkbox = false;
          } else {
            this.disable = true;
          }
        }else{
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
      this.formStatusdetails.bank = '1';
    } else {
      this.formStatusdetails.bank = '2';
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
        // verticalPosition: 'top'});
        this.toast.error({
          detail: 'Error',
          summary: error.message,
          duration: 3000,
        });
      }
    );
  }

  //  @ViewChild(MatTable) table: MatTable<Bank>;

  //  bank:FormGroup= this.fb.group({
  //    id:'',
  //    buser:{},
  //    extras:this.fb.array([])
  //  })

  //  matchValidator(controlValidationName: string): ValidatorFn {
  //    return (control: AbstractControl) => {

  //    if(typeof control === 'undefined' || control === null
  //    || typeof control.value === 'undefined' || control.value === null) {
  //        return {
  //            required: true
  //        }
  //    }

  //    const stateName: string = control.value.trim();
  //    var stateName2:string;
  //    let isPrimaryControl: AbstractControl = null;

  //    const parentFormGroup: FormGroup = <FormGroup>control.parent;

  //    if(typeof parentFormGroup !== 'undefined' && parentFormGroup !== null) {
  //      isPrimaryControl = (<FormGroup>control.parent).get(controlValidationName);
  //      stateName2 = isPrimaryControl.value;

  //    } else {
  //      // console.log('Parent control is undefined.');
  //    }

  //    if(typeof isPrimaryControl === 'undefined' || isPrimaryControl === null||
  //    typeof isPrimaryControl.value === 'undefined' || isPrimaryControl.value === null) {
  //        return {
  //            invalidFlag: true
  //        }
  //    }
  //    return stateName !== stateName2 ?
  //        { matchValidator: { value: control.value } } : null;
  //   }
  //  }

  //  bankaccountchange(){
  //    this.extras.at(0).patchValue(
  //      {confirmbankaccountno:""},
  //  )
  //  }

  //  ifsccodechange(){
  //    this.extras.at(0).patchValue(
  //      {confirmifsccode:""},
  //  )
  //  }

  //  defaultfield(){
  //    const g = this.fb.group({
  //    bankname: [''],
  //    branchname: [''],
  //    bankaccountno: [''],
  //    confirmbankaccountno: ['',[this.matchValidator('bankaccountno')]],
  //    ifsccode: [''],
  //    confirmifsccode: ['',[ this.matchValidator('ifsccode')]],
  //    bankaddress: [''],
  //    file:[''],
  //    filedata:'',
  //    filename:[''],
  //    filetype:['']
  //      },
  //      {
  //        validator: Validators.compose([
  //          checkMatchValidator('bankaccountno', 'confirmbankaccountno'),
  //          checkMatchValidator('ifsccode', 'confirmifsccode')
  //        ])
  //      }

  //      )
  //      this.extras.push(g);

  //  }

  //  get extras(){
  //    return this.bank.get('extras') as FormArray;
  //  }

  //  Submit(){
  //    if(this.bank.value.id==''){
  //      this.bank.value.buser['id'] = this.data.id;
  //      this.bankservice.savebankdetails(this.bank.value).subscribe(
  //        (data)=>{
  //          console.log("save=>>>>>>"+data);

  //        }
  //          ,
  //          (error)=>{
  //            console.log(error);

  //          }
  //      )

  //    }else{
  //      this.bankservice.updatebankdetails(this.bank.value).subscribe(
  //        (data)=>{
  //          console.log("update=>>>>>>"+data);

  //        }
  //          ,
  //          (error)=>{
  //            console.log(error);

  //          }
  //      )

  //    }

  //    }

  getuser(id) {
    this.bankservice.getbankdetails(id).subscribe(
      (data: bank) => {
        this.dataSource = new MatTableDataSource(data.extras);
        //  this.userdata = data;
        //  if(this.userdata != null){
        //    this.initializeForm();
        //  }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //  initializeForm(){
  //    this.bank.patchValue({
  //      id:this.userdata.id,
  //      buser:{id:this.userdata.buser.id},
  //      extras:this.userdata.extras,
  //    })
  //  }

  //  onselectFile(e,index){

  //    if (e.target.files[0].type.indexOf('image') == -1 && e.target.files[0].type.indexOf('pdf') == -1) {
  //      alert('Only (jpg, png, pdf) are allowed.');
  //      return;
  //    }else if(e.target.files[0].type.indexOf('pdf') != -1) {
  //       this.extras.at(index).patchValue(
  //        {filetype:"pdf"},
  //      )

  //    }else if(e.target.files[0].type.indexOf('image') != -1) {
  //       this.extras.at(index).patchValue(
  //        {filetype: "image"},
  //      )
  //    }

  //    this.reader = new FileReader();
  //    this.reader.readAsDataURL(e.target.files[0]);

  //  this.reader.onload= (event:any)=>{
  //    this.extras.at(index).patchValue(
  //      {filedata:event.target.result},
  //  )
  //  }

  //    }

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
