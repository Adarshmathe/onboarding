import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { GratuityService } from 'src/app/services/gratuity.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { gratuityDetails } from 'src/models/GratuityDetails';
import { PersonalDetails } from 'src/models/personalDetails';

@Component({
  selector: 'app-gratuity-download',
  templateUrl: './gratuity-download.component.html',
  styleUrls: ['./gratuity-download.component.css'],
})
export class GratuityDownloadComponent implements OnInit {
  @Input() id:Number;
  public user: any;
  public userdata: gratuityDetails = new gratuityDetails();
  public url: string;
  public personaldetails: PersonalDetails = new PersonalDetails();
  constructor(
    private fb: FormBuilder,
    private PersonaldetailsService: PersonaldetailsService,
    private GratuityService: GratuityService,
    private router: Router,
    private loader: LoaderService
  ) {}

  // gratuity:FormGroup= this.fb.group({
  //   id:'',
  //   guser:{},
  //  name3:'',
  //  name:'',
  //  name1:'',
  //  r1c1:'',
  //  r1c2:'',
  //  r1c3:'',
  //  r1c4:'',
  //  r2c1:'',
  //  r2c2:'',
  //  r2c3:'',
  //  r2c4:'',
  //  r3c1:'',
  //  r3c2:'',
  //  r3c3:'',
  //  r3c4:'',
  //  nameofemployee:'',
  //  sex:'',
  //  religion:'',
  //  ismarried:'',
  //  department:'',
  //  ticket:'',
  //  date:'',
  //  village:'',
  //  thana:'',
  //  subdivision:'',
  //  postoffice:'',
  //  district:'',
  //  state:'',
  //  date1:'',
  //  place1:'',
  //  witness1:'',
  //  witness2:'',
  //  date2:'',
  //  place2:'',
  //  date3:'',
  //  date4:''

  // })

  ngOnInit(): void {
    this.getpersonaldetails();
    // this.getuser();
  }

  getuser() {
    this.loader.start();
    this.GratuityService.getgratuitydetails(this.id).subscribe(
      (data: gratuityDetails) => {
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
    this.userdata.name= this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
    this.userdata.nameofemployee= this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
    this.userdata.sex=this.personaldetails.gender,
    this.userdata.religion=this.personaldetails.religion,
    this.userdata.ismarried=this.personaldetails.maritalstatus,
    this.userdata.district=this.personaldetails.permanentaddress.district,
    this.userdata.state=this.personaldetails.permanentaddress.state
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
      }, ()=>{
        
        this.getuser()
      }
    );
  }

  // initializeForm() {
  //   this.gratuity.patchValue({
  //     id: this.userdata.id,
  //     guser: { id: this.userdata.guser.id },
  //     name3: this.userdata.name3,
  //     name: this.userdata.name,
  //     name1: this.userdata.name1,
  //     r1c1: this.userdata.r1c1,
  //     r1c2: this.userdata.r1c2,
  //     r1c3: this.userdata.r1c3,
  //     r1c4: this.userdata.r1c4,
  //     r2c1: this.userdata.r2c1,
  //     r2c2: this.userdata.r2c2,
  //     r2c3: this.userdata.r2c3,
  //     r2c4: this.userdata.r2c4,
  //     r3c1: this.userdata.r3c1,
  //     r3c2: this.userdata.r3c2,
  //     r3c3: this.userdata.r3c3,
  //     r3c4: this.userdata.r3c4,
  //     nameofemployee: this.userdata.nameofemployee,
  //     sex: this.userdata.sex,
  //     religion: this.userdata.religion,
  //     ismarried: this.userdata.ismarried,
  //     department: this.userdata.department,
  //     ticket: this.userdata.ticket,
  //     date: this.userdata.date,
  //     village: this.userdata.village,
  //     thana: this.userdata.thana,
  //     subdivision: this.userdata.subdivision,
  //     postoffice: this.userdata.postoffice,
  //     district: this.userdata.district,
  //     state: this.userdata.state,
  //     date1: this.userdata.date1,
  //     place1: this.userdata.place1,
  //     witness1: this.userdata.witness1,
  //     witness2: this.userdata.witness2,
  //     date2: this.userdata.date2,
  //     place2: this.userdata.place2,
  //     date3: this.userdata.date3,
  //     date4: this.userdata.date4,
  //   });
  // }
}
