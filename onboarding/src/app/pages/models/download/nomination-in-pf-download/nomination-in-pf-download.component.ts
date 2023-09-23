import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { BankdetailsService } from 'src/app/services/bankdetails.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { NominationInPfService } from 'src/app/services/nomination-in-pf.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { bank } from 'src/models/bankDetails';
import { nominationinPfDetails } from 'src/models/NominationInPf';
import { PersonalDetails } from 'src/models/personalDetails';

@Component({
  selector: 'app-nomination-in-pf-download',
  templateUrl: './nomination-in-pf-download.component.html',
  styleUrls: ['./nomination-in-pf-download.component.css'],
})
export class NominationInPfDownloadComponent implements OnInit {
  @Input() id:Number;
  // public user: any;
  public userdata: nominationinPfDetails = new nominationinPfDetails();
  public personaldetails: PersonalDetails = new PersonalDetails();
  // public bankdetails: bank = new bank();
  public bankdetails: bank;
  public url: String;
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private bankservice: BankdetailsService,
    private PersonaldetailsService: PersonaldetailsService,
    private login: LoginService,
    private NominationInPfService: NominationInPfService,
    private router: Router,
    private loader: LoaderService
  ) {}

  // nomination:FormGroup= this.fb.group({
  //   id:'',
  //   nuser:{},
  //  name:['',[Validators.required]],
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
  //  date1:'',
  //  date2:'',
  //  place:''
  // })

  ngOnInit(): void {
    // this.user = this.login.getuser();
    this.getpersonaldetails();
   
  }

  getuser() {
    this.loader.start();
    this.NominationInPfService.getnominationinpfdetails(this.id).subscribe(
      (data: nominationinPfDetails) => {
        this.loader.stop();
        this.userdata = data;
        this.loadMasterData();
        // if (this.userdata != null) {
        //   this.initializeForm();
        // }
      },
      (error) => {
        this.loader.stop();
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

  getpersonaldetails() {
    this.PersonaldetailsService.get(this.id).subscribe(
      (data: PersonalDetails) => {
        this.personaldetails = data;
      
        this.url =
          userdocumenturl + this.id + '/' + this.personaldetails.signaturename;
      },
      (error) => {
        console.log(error);
      },()=>{
        this.getbankdetails();
      }
    );
  }
  getbankdetails() {
    this.bankservice.getbankdetails(this.id).subscribe(
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

  // initializeForm() {
  //   this.nomination.patchValue({
  //     id: this.userdata.id,
  //     nuser: { id: this.userdata.nuser.id },
  //     name: this.userdata.name,
  //     fathername: this.userdata.fathername,
  //     surname: this.userdata.surname,
  //     dob: this.userdata.dob,
  //     accountno: this.userdata.accountno,
  //     sex: this.userdata.sex,
  //     marital: this.userdata.marital,
  //     address: this.userdata.address,
  //     r2c1: this.userdata.r2c1,
  //     r2c2: this.userdata.r2c2,
  //     r2c3: this.userdata.r2c3,
  //     r2c4: this.userdata.r2c4,
  //     r2c5: this.userdata.r2c5,
  //     r2c6: this.userdata.r2c6,
  //     r3c1: this.userdata.r3c1,
  //     r3c2: this.userdata.r3c2,
  //     r3c3: this.userdata.r3c3,
  //     r3c4: this.userdata.r3c4,
  //     r3c5: this.userdata.r3c5,
  //     r3c6: this.userdata.r3c6,
  //     r4c1: this.userdata.r4c1,
  //     r4c2: this.userdata.r4c2,
  //     r4c3: this.userdata.r4c3,
  //     r4c4: this.userdata.r4c4,
  //     r4c5: this.userdata.r4c5,
  //     r4c6: this.userdata.r4c6,
  //     r5c1: this.userdata.r5c1,
  //     r5c2: this.userdata.r5c2,
  //     r5c3: this.userdata.r5c3,
  //     r5c4: this.userdata.r5c4,
  //     r5c5: this.userdata.r5c5,
  //     r5c6: this.userdata.r5c6,
  //     r6c1: this.userdata.r6c1,
  //     r6c2: this.userdata.r6c2,
  //     r6c3: this.userdata.r6c3,
  //     r6c4: this.userdata.r6c4,
  //     r6c5: this.userdata.r6c5,
  //     r6c6: this.userdata.r6c6,
  //     t1r2c1: this.userdata.t1r2c1,
  //     t1r2c2: this.userdata.t1r2c2,
  //     t1r2c3: this.userdata.t1r2c3,
  //     t1r2c4: this.userdata.t1r2c4,
  //     t1r3c1: this.userdata.t1r3c1,
  //     t1r3c2: this.userdata.t1r3c2,
  //     t1r3c3: this.userdata.t1r3c3,
  //     t1r3c4: this.userdata.t1r3c4,
  //     t1r4c1: this.userdata.t1r4c1,
  //     t1r4c2: this.userdata.t1r4c2,
  //     t1r4c3: this.userdata.t1r4c3,
  //     t1r4c4: this.userdata.t1r4c4,
  //     t1r5c1: this.userdata.t1r5c1,
  //     t1r5c2: this.userdata.t1r5c2,
  //     t1r5c3: this.userdata.t1r5c3,
  //     t1r5c4: this.userdata.t1r5c4,
  //     t1r6c1: this.userdata.t1r6c1,
  //     t1r6c2: this.userdata.t1r6c2,
  //     t1r6c3: this.userdata.t1r6c3,
  //     t1r6c4: this.userdata.t1r6c4,
  //     t2r1c1: this.userdata.t2r1c1,
  //     t2r1c2: this.userdata.t2r1c2,
  //     t2r1c3: this.userdata.t2r1c3,
  //     t2r2c1: this.userdata.t2r2c1,
  //     t2r2c2: this.userdata.t2r2c2,
  //     t2r2c3: this.userdata.t2r2c3,
  //     t2r3c1: this.userdata.t2r3c1,
  //     t2r3c2: this.userdata.t2r3c2,
  //     t2r3c3: this.userdata.t2r3c3,
  //     t2r4c1: this.userdata.t2r4c1,
  //     t2r4c2: this.userdata.t2r4c2,
  //     t2r4c3: this.userdata.t2r4c3,
  //     t2r5c1: this.userdata.t2r5c1,
  //     t2r5c2: this.userdata.t2r5c2,
  //     t2r5c3: this.userdata.t2r5c3,
  //     date: this.userdata.date,
  //     name1: this.userdata.name1,
  //     date1: this.userdata.date1,
  //   });
  // }
}
