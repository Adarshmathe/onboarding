import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { GroupTermInsuranceService } from 'src/app/services/group-term-insurance.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { groupInsuranceDetails } from 'src/models/GroupTermInsurance';
import { PersonalDetails } from 'src/models/personalDetails';

@Component({
  selector: 'app-group-teram-insurance-download',
  templateUrl: './group-teram-insurance-download.component.html',
  styleUrls: ['./group-teram-insurance-download.component.css'],
})
export class GroupTeramInsuranceDownloadComponent implements OnInit {
  @Input() id: Number;
  // public user: any;
  public userdata: groupInsuranceDetails = new groupInsuranceDetails();
  public url: string;
  public personaldetails: PersonalDetails = new PersonalDetails();
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private login: LoginService,
    private PersonaldetailsService: PersonaldetailsService,
    private GroupTermInsuranceService: GroupTermInsuranceService,
    private router: Router,
    private loader: LoaderService
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
  //  date:''
  // })

  ngOnInit(): void {
    // this.user = this.login.getuser();
    this.getpersonaldetails();
    // this.getuser();
  }

  getuser() {
    this.loader.start();
    this.GroupTermInsuranceService.getgroupterminsurancedetails(
      this.id
    ).subscribe(
      (data: groupInsuranceDetails) => {
        this.loader.stop();
        this.userdata = data;
        this.loadMasterData();
        // if(this.userdata != null){
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
    this.PersonaldetailsService.get(this.id).subscribe(
      (data: PersonalDetails) => {
        this.personaldetails = data;

        this.url =
          userdocumenturl + this.id + '/' + this.personaldetails.signaturename;
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
