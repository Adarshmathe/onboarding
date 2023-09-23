import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { BankdetailsService } from 'src/app/services/bankdetails.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { PfdetailsService } from 'src/app/services/pfdetails.service';
import { bank } from 'src/models/bankDetails';
import { PersonalDetails } from 'src/models/personalDetails';
import { ProvidentFund } from 'src/models/ProvidentFundModel';

@Component({
  selector: 'app-pfform-download',
  templateUrl: './pfform-download.component.html',
  styleUrls: ['./pfform-download.component.css'],
})
export class PFformDownloadComponent implements OnInit {
  @Input() id:Number;
  public userdata: ProvidentFund = new ProvidentFund();
  public personaldetails: PersonalDetails = new PersonalDetails();
  public url: String;
  public bankdetails: bank = new bank();
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private login: LoginService,
    private PersonaldetailsService: PersonaldetailsService,
    private pfservice: PfdetailsService,
    private router: Router,
    private bankservice:BankdetailsService,
    private loader: LoaderService
  ) {}

  // pf: FormGroup = this.fb.group({
  //   id: '',
  //   pfuser: {},
  //   name: '',
  //   checkboxname: '',
  //   checkboxvalue: '',
  //   dob: '',
  //   Gender: '',
  //   maritalstatus: '',
  //   emailid: '',
  //   mobile: '',
  //   providentfundscheme: '',
  //   pensionscheme: '',
  //   uan: '',
  //   previouspfno: '',
  //   dateofexit: '',
  //   schemecertno: '',
  //   ppo: '',
  //   internationalworker: '',
  //   country: '',
  //   passportno: '',
  //   validity: '',
  //   bankaccountandifsc: '',
  //   aadharcard: '',
  //   panno: '',
  //   empcode: '',
  //   company: '',
  //   date: '',
  //   place: '',
  //   date1: '',
  //   name1: '',
  //   date3: '',
  //   pfno: '',
  //   uan1: '',
  //   checkbox1: '',
  //   checkbox2: '',
  // });

  ngOnInit(): void {
    this.getpersonaldetails();
  
  }

  getpersonaldetails() {
    this.loader.start();
    this.PersonaldetailsService.get(this.id).subscribe(
      (data: PersonalDetails) => {
        this.loader.stop();
        this.personaldetails = data;
        this.url =
          userdocumenturl + this.id + '/' + this.personaldetails.signaturename;
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      },()=>{
        this.getbankdetails();
       }
    );
  }
  getbankdetails(){
 
    this.bankservice.getbankdetails(this.id).subscribe(
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
    this.pfservice.getpfdetails(this.id).subscribe(
      (data: ProvidentFund) => {
        this.userdata = data;
        this.loadMasterData();
        // if (this.userdata != null) {
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

  // initializeForm() {
  //   this.pf.patchValue({
  //     id: this.userdata.id,
  //     pfuser: { id: this.userdata.pfuser.id },
  //     name: this.userdata.name,
  //     checkboxname: this.userdata.checkboxname,
  //     checkboxvalue: this.userdata.checkboxvalue,
  //     dob: this.userdata.dob,
  //     // dob: this.datepipe.transform(this.userdata.dob, 'dd/MM/yyyy'),
  //     Gender: this.userdata.gender,
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
  //     panno: this.userdata.panno,
  //     empcode: this.userdata.empcode,
  //     company: this.userdata.company,
  //     date: this.userdata.date,
  //     place: this.userdata.place,
  //     date1: this.userdata.date1,
  //     name1: this.userdata.name1,
  //     date3: this.userdata.date3,
  //     pfno: this.userdata.pfno,
  //     uan1: this.userdata.uan1,
  //     checkbox1: this.userdata.checkbox1,
  //     checkbox2: this.userdata.checkbox2,
  //   });
  // }
}
