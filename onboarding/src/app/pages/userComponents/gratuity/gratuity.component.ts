import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { AlertBoxServiceService } from 'src/app/component/nav-bar/alert-box/alert-box-service.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { GratuityService } from 'src/app/services/gratuity.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { AppValidation } from 'src/app/services/validation';
import { AlertService } from 'src/app/_alert';
import { formstatus } from 'src/models/formStatus';
import { gratuityDetails } from 'src/models/GratuityDetails';
import { PersonalDetails } from 'src/models/personalDetails';
import { user } from 'src/models/user';
import { relations } from 'src/models/utils';

@Component({
  selector: 'app-gratuity',
  templateUrl: './gratuity.component.html',
  styleUrls: ['./gratuity.component.css']
})
export class GratuityComponent implements OnInit {
  public user: user;
  public gratuityDetails:gratuityDetails;
  public formStatusdetails: formstatus;
  public url:String;
  public personaldetails:PersonalDetails;
  public relations = relations();
  constructor(private fb: FormBuilder,public datepipe: DatePipe,    private toast: NgToastService,
    private loader: LoaderService,protected alertService: AlertService,private login:LoginService,private PersonaldetailsService:PersonaldetailsService ,private GratuityService:GratuityService,private router:Router,private formstatus:FormStatusService,private modalService: AlertBoxServiceService) { }
  private validation = new AppValidation();
  gratuity:FormGroup= this.fb.group({
    id:'',
    guser:{},
   name3:['',[Validators.required]],
   name:[{value:'',disabled:true},[Validators.required]],
   name1:['',[Validators.required]],
   r1c1:['',[Validators.required]],
   r1c2:['',[Validators.required]],
   r1c3:['',[Validators.required]],
   r1c4:['',[Validators.required]],
   r2c1:'',
   r2c2:'',
   r2c3:'',
   r2c4:'',
   r3c1:'',
   r3c2:'',
   r3c3:'',
   r3c4:'',
   nameofemployee:[{value:'',disabled:true},[Validators.required]],
   sex:[{value:'',disabled:true},[Validators.required]],
   religion:[{value:'',disabled:true},[Validators.required]],
   ismarried:[{value:'',disabled:true},[Validators.required]],
   department:['',[Validators.required]],
   ticket:[''],
   date:['',[Validators.required]],
   village:['',[Validators.required]],
   thana:['',[Validators.required]],
   subdivision:['',[Validators.required]],
   postoffice:['',[Validators.required]],
   district:[{value:'',disabled:true},[Validators.required]],
   state:[{value:'',disabled:true},[Validators.required]],
   date1:[{value:'',disabled:true},[Validators.required]],
   place1:['',[Validators.required]],
   witness1:['',[Validators.required]],
   witness2:['',[Validators.required]],
   date2:[{value:'',disabled:true},[Validators.required]],
   place2:['',[Validators.required]],
   date3:[{value:'',disabled:true},[Validators.required]],
   date4:[{value:'',disabled:true},[Validators.required,]],
  })

  ngOnInit(): void {
    this.user = this.login.getuser();
    this.getpersonaldetails();
    this.getFormStatus();
  
   
  }

  getFormStatus(){
    this.formstatus.getformstate(this.user.id).subscribe(
      (data:formstatus)=>{
        if(data!=null){
          this.formStatusdetails = data;
          if(this.formStatusdetails.gratuity=='2'){
            this.gratuity.disable();
          }
        }
        
      },
        (error)=>{
          console.log(error);
        }
        )
  }

  _keyPress(event: any) {
    this.validation.allowedNumberOnly(event);
  }

  Submit(){

    let total:number=0;
    for(let i=1;i<=3;i++){
    let value = `r${i}c4`;
    total+= Number(this.gratuity.value[value]);
    
    } 
  
    if(total!=100){
      // this.alertService.error('Total Proportion by which the gratuity will be shared should be 100%')
      this.modalService.showModal("Total Proportion by which the gratuity will be shared should be 100%");
      return;
    }

    if(this.gratuity.value.id==''){
      this.gratuity.value.guser['id'] = this.user.id;
      this.loader.start();
      this.GratuityService.savegratuitydetails(this.gratuity.getRawValue()).subscribe(
        (data:gratuityDetails)=>{
          this.loader.stop();
          // console.log("save=>>>>>>"+data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Saved',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/eca']);
          this.formstatus.formstatusSubject.next(true);
        }
          ,
          (error)=>{
            this.loader.stop();
            console.log(error);
            this.toast.error({
              detail: 'Error',
              summary: error.message,
              duration: 3000,
            });
            
          }
      )
      
    }else{
      this.loader.start();
      this.GratuityService.updategratuitydetails(this.gratuity.getRawValue()).subscribe(
        (data:gratuityDetails)=>{
          this.loader.stop();
          // console.log("update=>>>>>>"+data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Updated',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/eca']);
        }
          ,
          (error)=>{
            this.loader.stop();
            console.log(error);
            this.toast.error({
              detail: 'Error',
              summary: error.message,
              duration: 3000,
            });
            
          }
      )
      
    }
    
    
    }

  getGratuityDetails(){
    this.GratuityService.getgratuitydetails(this.user.id).subscribe(
      (data:gratuityDetails)=>{
        this.gratuityDetails = data;
          this.initializeForm();
      },
        (error)=>{
          console.log(error);
          this.defaultinitializeForm();
        }
        )
  }

  getpersonaldetails():void{
    this.PersonaldetailsService.get(this.user.id).subscribe(
      (data:PersonalDetails)=>{
        this.personaldetails = data;
        this.url = userdocumenturl+this.user.id+"/" + this.personaldetails.signaturename; 
      },
        (error)=>{
          console.log(error);
        },
        ()=>{
          this.getGratuityDetails();
        }
      )
  }

  initializeForm(){
    this.gratuity.patchValue({
      id:this.gratuityDetails.id,
      guser:{id:this.gratuityDetails.guser.id},
      name3:this.gratuityDetails.name3,
      name: this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
      name1:this.gratuityDetails.name1,
   r1c1:this.gratuityDetails.r1c1,
   r1c2:this.gratuityDetails.r1c2,
   r1c3:this.gratuityDetails.r1c3,
   r1c4:this.gratuityDetails.r1c4,
   r2c1:this.gratuityDetails.r2c1,
   r2c2:this.gratuityDetails.r2c2,
   r2c3:this.gratuityDetails.r2c3,
   r2c4:this.gratuityDetails.r2c4,
   r3c1:this.gratuityDetails.r3c1,
   r3c2:this.gratuityDetails.r3c2,
   r3c3:this.gratuityDetails.r3c3,
   r3c4:this.gratuityDetails.r3c4,
   nameofemployee: this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
   sex:this.personaldetails.gender,
   religion:this.personaldetails.religion,
   ismarried:this.personaldetails.maritalstatus,
   department:this.gratuityDetails.department,
   ticket:this.gratuityDetails.ticket,
   date:this.gratuityDetails.date,
   village:this.gratuityDetails.village,
   thana:this.gratuityDetails.thana,
   subdivision:this.gratuityDetails.subdivision,
   postoffice:this.gratuityDetails.postoffice,
   district:this.personaldetails.permanentaddress.district,
   state:this.personaldetails.permanentaddress.state,
   date1:this.gratuityDetails.date1,
   place1:this.gratuityDetails.place1,
   witness1:this.gratuityDetails.witness1,
   witness2:this.gratuityDetails.witness2,
   date2:this.gratuityDetails.date2,
   place2:this.gratuityDetails.place2,
   date3:this.gratuityDetails.date3,
   date4:this.gratuityDetails.date4
     
    })
  }

  defaultinitializeForm(){
    this.gratuity.patchValue({
   
  // name3:this.gratuityDetails.name3,
   name: this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
  //  name1:this.personaldetails.firstname,
  //  r1c1:this.gratuityDetails.r1c1,
  //  r1c2:this.gratuityDetails.r1c2,
  //  r1c3:this.gratuityDetails.r1c3,
  //  r1c4:this.gratuityDetails.r1c4,
  //  r2c1:this.gratuityDetails.r2c1,
  //  r2c2:this.gratuityDetails.r2c2,
  //  r2c3:this.gratuityDetails.r2c3,
  //  r2c4:this.gratuityDetails.r2c4,
  //  r3c1:this.gratuityDetails.r3c1,
  //  r3c2:this.gratuityDetails.r3c2,
  //  r3c3:this.gratuityDetails.r3c3,
  //  r3c4:this.gratuityDetails.r3c4,
   nameofemployee: this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
   sex:this.personaldetails.gender,
   religion:this.personaldetails.religion,
   ismarried:this.personaldetails.maritalstatus,
  //  department:this.gratuityDetails.department,
  //  ticket:this.gratuityDetails.ticket,
  //  date:this.gratuityDetails.date,
  //  village:this.gratuityDetails.village,
  //  thana:this.gratuityDetails.thana,
  //  subdivision:this.gratuityDetails.subdivision,
  //  postoffice:this.gratuityDetails.postoffice,
   district:this.personaldetails.permanentaddress.district,
   state:this.personaldetails.permanentaddress.state,
   date1:new Date(),
  //  place1:this.gratuityDetails.place1,
  //  witness1:this.gratuityDetails.witness1,
  //  witness2:this.gratuityDetails.witness2,
   date2:new Date(),
  //  place2:this.gratuityDetails.place2,
   date3:new Date(),
   date4:new Date(),
     
    })
  }


}
