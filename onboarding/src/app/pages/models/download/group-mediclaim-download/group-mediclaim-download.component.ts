import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { MediclamService } from 'src/app/services/mediclam.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { mediclaimDetails } from 'src/models/MediclaimDetails';
import { PersonalDetails } from 'src/models/personalDetails';

@Component({
  selector: 'app-group-mediclaim-download',
  templateUrl: './group-mediclaim-download.component.html',
  styleUrls: ['./group-mediclaim-download.component.css']
})
export class GroupMediclaimDownloadComponent implements OnInit{
  @Input()id:Number;
  // public user: any;
  public userdata:mediclaimDetails = new mediclaimDetails();
  public url:string;
  public personaldetails:PersonalDetails = new PersonalDetails();
  constructor(private fb: FormBuilder,  private loader: LoaderService,private PersonaldetailsService:PersonaldetailsService,private login:LoginService,private MediclamService:MediclamService,private router:Router ) { }

  // mediclaim:FormGroup= this.fb.group({
  //   id:'',
  //   muser:{},
  //   name:['',[Validators.required]],
  //   management:['',[Validators.required]],
  //   email:['',[Validators.required]],
  //   address:['',[Validators.required]],
  //   mobile:['',[Validators.required]],
  //   erp:['',[Validators.required]],
  //   doj:['',[Validators.required]],
  //   dept:['',[Validators.required]],
  //   designation:['',[Validators.required]],
  //   alternateno:['',[Validators.required]],
  //  r1c2:'',
  //  r1c3:'',
  //  r1c4:'',
  //  r1c5:'',
  //  r1c6:'',
  //  r2c2:'',
  //  r2c3:'',
  //  r2c4:'',
  //  r2c5:'',
  //  r2c6:'',
  //  r3c2:'',
  //  r3c3:'',
  //  r3c4:'',
  //  r3c5:'',
  //  r3c6:'',
  //  r4c2:'',
  //  r4c3:'',
  //  r4c4:'',
  //  r4c5:'',
  //  r4c6:'',
  //  r5c2:'',
  //  r5c3:'',
  //  r5c4:'',
  //  r5c5:'',
  //  r5c6:'',
  //  r6c2:'',
  //  r6c3:'',
  //  r6c4:'',
  //  r6c5:'',
  //  r6c6:'',
  //  place:'',
  //  date:''
  
  // })

  ngOnInit(): void {
    // this.user = this.login.getuser();
    this.getpersonaldetails();
    // this.getuser();
  }


  getuser(){
    this.loader.start();
    this.MediclamService.getmediclaimdetails(this.id).subscribe(
      (data:mediclaimDetails)=>{
        this.loader.stop();
        this.userdata = data;
        this.loadMasterData();
        // if(this.userdata != null){
        //   this.initializeForm();
        // }
      },
        (error)=>{
          this.loader.stop();
          console.log(error);
        }
        )
  }
  loadMasterData(){
    this.userdata.name = this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
    this.userdata.email =this.personaldetails.email,
    this.userdata.address =this.personaldetails.permanentaddress.houseNo +" "+this.personaldetails.permanentaddress.location+" "+this.personaldetails.permanentaddress.city+" "+this.personaldetails.permanentaddress.state,
    this.userdata.mobile =this.personaldetails.contact
  }

  getpersonaldetails(){
    this.PersonaldetailsService.get(this.id).subscribe(
      (data:PersonalDetails)=>{
        this.personaldetails = data;
     
        this.url = userdocumenturl+this.id+"/" + this.personaldetails.signaturename; 
      },
        (error)=>{
          console.log(error);
        },()=>{
          this.getuser();
        }
        )
  }

  // initializeForm(){
  //   this.mediclaim.patchValue({
  //     id:this.userdata.id,
  //     muser:{id:this.userdata.muser.id},
  //     name:this.userdata.name,
  //     management:this.userdata.management,
  //     email:this.userdata.email,
  //     address:this.userdata.address,
  //     mobile:this.userdata.mobile,
  //     erp:this.userdata.erp,
  //     doj:this.userdata.doj,
  //     dept:this.userdata.dept,
  //     designation:this.userdata.designation,
  //     alternateno:this.userdata.alternateno,
  //     r1c2:this.userdata.r1c2,
  //   r1c3:this.userdata.r1c3,
  //   r1c4:this.userdata.r1c4,
  //   r1c5:this.userdata.r1c5,
  //   r1c6:this.userdata.r1c6,
  //   r2c2:this.userdata.r2c2,
  //   r2c3:this.userdata.r2c3,
  //   r2c4:this.userdata.r2c4,
  //   r2c5:this.userdata.r2c5,
  //   r2c6:this.userdata.r2c6,
  //   r3c2:this.userdata.r3c2,
  //   r3c3:this.userdata.r3c3,
  //   r3c4:this.userdata.r3c4,
  //   r3c5:this.userdata.r3c5,
  //   r3c6:this.userdata.r3c6,
  //   r4c2:this.userdata.r4c2,
  //   r4c3:this.userdata.r4c3,
  //   r4c4:this.userdata.r4c4,
  //   r4c5:this.userdata.r4c5,
  //   r4c6:this.userdata.r4c6,
  //   r5c2:this.userdata.r5c2,
  //   r5c3:this.userdata.r5c3,
  //   r5c4:this.userdata.r5c4,
  //   r5c5:this.userdata.r5c5,
  //   r5c6:this.userdata.r5c6,
  //   r6c2:this.userdata.r6c2,
  //   r6c3:this.userdata.r6c3,
  //   r6c4:this.userdata.r6c4,
  //   r6c5:this.userdata.r6c5,
  //   r6c6:this.userdata.r6c6,
  
     
  //   })
  // }

}
