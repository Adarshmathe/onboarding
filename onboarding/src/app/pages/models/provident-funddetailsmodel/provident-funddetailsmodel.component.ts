import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';
import { BankdetailsService } from 'src/app/services/bankdetails.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { userdocumenturl } from 'src/app/services/helper';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { PfdetailsService } from 'src/app/services/pfdetails.service';
import { bank } from 'src/models/bankDetails';
import { formstatus } from 'src/models/formStatus';
import { PersonalDetails } from 'src/models/personalDetails';
import { ProvidentFund } from 'src/models/ProvidentFundModel';
import { modeldata } from 'src/models/utils';

@Component({
  selector: 'app-provident-funddetailsmodel',
  templateUrl: './provident-funddetailsmodel.component.html',
  styleUrls: ['./provident-funddetailsmodel.component.css'],
})
export class ProvidentFunddetailsmodelComponent implements OnInit {
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  public userdata: ProvidentFund = new ProvidentFund();
  public personaldetails: PersonalDetails = new PersonalDetails();
  public bankdetails: bank = new bank();
  public url: String;

  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private snack: MatSnackBar,
    private PersonaldetailsService: PersonaldetailsService,
    private pfservice: PfdetailsService,
    private formstatusservice: FormStatusService,
    private bankservice:BankdetailsService,
    private toast: NgToastService
  ) {}

  // pf:FormGroup= this.fb.group({
  //   id:'',
  //   pfuser:{},
  //  name:'',
  //  checkboxname:'',
  //  checkboxvalue:'',
  //  dob:'',
  //  gender:'',
  //  maritalstatus:'',
  //  emailid:'',
  //  mobile:'',
  //  providentfundscheme:'',
  //  pensionscheme:'',
  //  uan:'',
  //  previouspfno:'',
  //  dateofexit:'',
  //  schemecertno:'',
  //  ppo:'',
  //  internationalworker:'',
  //  country:'',
  //  passportno:'',
  //  validity:'',
  //  bankaccountandifsc:'',
  //  aadharcard:'',
  //  panno:'',
  //  empcode:'',
  //  company:'',
  //  date:'',
  //  place:'',
  //  date1:'',
  //  name1:'',
  //  date3:'',
  //  pfno:'',
  //  uan1:'',
  //  checkbox1:'',
  //  checkbox2:''
  // });

  ngOnInit(): void {
    this.getpersonaldetails();
    this.getFormStatus(this.data.id);
    
  }
  getFormStatus(id) {
    this.formstatusservice.getformstate(id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.initialization(data);
          if (this.formStatusdetails.provident == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.provident == '2') {
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
      this.formStatusdetails.provident = '1';
    } else {
      this.formStatusdetails.provident = '2';
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
  //   if(this.pf.value.id==''){
  //     this.pf.value.pfuser['id'] = this.data.id;
  //     this.pfservice.savepfdetails(this.pf.value).subscribe(
  //       (data)=>{
  //         console.log("save=>>>>>>"+data);

  //       }
  //         ,
  //         (error)=>{
  //           console.log(error);

  //         }
  //     )

  //   }else{
  //     this.pfservice.updatepfdetails(this.pf.value).subscribe(
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
  getbankdetails(){
 
    this.bankservice.getbankdetails(this.data.id).subscribe(
     (data:bank)=>{
      //  console.log(data);  
       this.bankdetails = data;
    
     },
       (error)=>{
         console.log(error);
        
       },
       ()=>{
        
         this.getuser()
       }
       )
       
 }

  getuser() {
    this.pfservice.getpfdetails(this.data.id).subscribe(
      (data: ProvidentFund) => {
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
    this.userdata.name =  this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
    this.userdata.dob= this.personaldetails.dob,
    this.userdata.gender= this.personaldetails.gender,
    this.userdata.maritalstatus= this.personaldetails.maritalstatus,
    this.userdata.emailid= this.personaldetails.email,
    this.userdata.mobile= this.personaldetails.contact,
    this.userdata.passportno= this.personaldetails.passportDetails.passportNumber ?this.personaldetails.passportDetails.passportNumber :"" ,

    this.userdata.validity= (this.personaldetails.passportDetails.dateofissue && this.personaldetails.passportDetails.dateofexpiry)? this.datepipe.transform(this.personaldetails.passportDetails.dateofissue , 'dd/MM/yyyy') +" to "+ this.datepipe.transform(this.personaldetails.passportDetails.dateofexpiry , 'dd/MM/yyyy'):"",
    this.userdata.bankaccountandifsc= this.bankdetails.extras[0].bankaccountno +" "+ this.bankdetails.extras[0].ifsccode,
    this.userdata.aadharcard= this.personaldetails.panAndaadhar.aadharNumber,
    this.userdata.panno=this.personaldetails.panAndaadhar.panNumber

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

  // initializeForm(){
  //   this.pf.patchValue({
  //     id:this.userdata.id,
  //     pfuser:{id:this.userdata.pfuser.id},
  //     name: this.userdata.name,
  //     checkboxname: this.userdata.checkboxname,
  //     checkboxvalue: this.userdata.checkboxvalue,
  //     dob: this.userdata.dob,
  //     // dob: this.datepipe.transform(this.userdata.dob, 'dd/MM/yyyy'),
  //     gender: this.userdata.gender,
  //     maritalstatus: this.userdata.maritalstatus,
  //     emailid: this.userdata.emailid,
  //     mobile: this.userdata.mobile,
  //     providentfundscheme: this.userdata.providentfundscheme,
  //     pensionscheme: this.userdata.pensionscheme,
  //     uan: this.userdata.uan,
  //     previouspfno: this.userdata.previouspfno,
  //     dateofexit: this.userdata.dateofexit,
  //     schemecertno: this.userdata.schemecertno,
  //     ppo: this.userdata.ppo,
  //     internationalworker: this.userdata.internationalworker,
  //     country: this.userdata.country,
  //     passportno: this.userdata.passportno,
  //     validity: this.userdata.validity,
  //     bankaccountandifsc: this.userdata.bankaccountandifsc,
  //     aadharcard: this.userdata.aadharcard,
  //     panno:this.userdata.panno,
  //     empcode:this.userdata.empcode,
  //     company:this.userdata.company,
  //     date:this.userdata.date,
  //     place:this.userdata.place,
  //     date1:this.userdata.date1,
  //     name1:this.userdata.name1,
  //     date3:this.userdata.date3,
  //     pfno:this.userdata.pfno,
  //     uan1:this.userdata.uan1,
  //     checkbox1:this.userdata.checkbox1,
  //     checkbox2:this.userdata.checkbox2,
  //   })
  // }
}
