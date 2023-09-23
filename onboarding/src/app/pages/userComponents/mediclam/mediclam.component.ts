import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { userdocumenturl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { MediclamService } from 'src/app/services/mediclam.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { AppValidation } from 'src/app/services/validation';
import { formstatus } from 'src/models/formStatus';
import { mediclaimDetails } from 'src/models/MediclaimDetails';
import { PersonalDetails } from 'src/models/personalDetails';
import { user } from 'src/models/user';
import { relations } from 'src/models/utils';

@Component({
  selector: 'app-mediclam',
  templateUrl: './mediclam.component.html',
  styleUrls: ['./mediclam.component.css']
})
export class MediclamComponent implements OnInit {

  public user: user;
  public formStatusdetails: formstatus;
  public mediclaimDetails:mediclaimDetails;
  public url:String;
  public personaldetails:PersonalDetails;
  public relations = relations();
  constructor(private fb: FormBuilder,public datepipe: DatePipe,    private toast: NgToastService,
    private loader: LoaderService,private PersonaldetailsService:PersonaldetailsService,private login:LoginService,private MediclamService:MediclamService,private router:Router,private formstatus:FormStatusService ) { }
  private validation = new AppValidation();
  mediclaim:FormGroup= this.fb.group({
    id:'',
    muser:{},
    name:[{value:'',disabled:true},[Validators.required]],
    management:['',[Validators.required]],
    email:[{value:'',disabled:true},[Validators.required]],
    address:[{value:'',disabled:true},[Validators.required]],
    mobile:[{value:'',disabled:true},[Validators.required]],
    erp:['',[Validators.required]],
    doj:['',[Validators.required]],
    dept:['',[Validators.required]],
    designation:['',[Validators.required]],
    alternateno:['',[Validators.required]],
   r1c2:['',[Validators.required]],
   r1c3:['',[Validators.required]],
   r1c4:['',[Validators.required]],
   r1c5:['',[Validators.required]],
   r1c6:['',[Validators.required]],
   r2c2:'',
   r2c3:'',
   r2c4:'',
   r2c5:'',
   r2c6:'',
   r3c2:'',
   r3c3:'',
   r3c4:'',
   r3c5:'',
   r3c6:'',
   r4c2:'',
   r4c3:'',
   r4c4:'',
   r4c5:'',
   r4c6:'',
   r5c2:'',
   r5c3:'',
   r5c4:'',
   r5c5:'',
   r5c6:'',
   r6c2:'',
   r6c3:'',
   r6c4:'',
   r6c5:'',
   r6c6:'',
   place:['',[Validators.required]],
   date:[{value:'',disabled:true},[Validators.required]]
  
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
          if(this.formStatusdetails.groupMediclaim=='2'){
            this.mediclaim.disable();
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
    if(this.mediclaim.value.id==''){
      this.mediclaim.value.muser['id'] = this.user.id;
      this.loader.start();
      this.MediclamService.savemediclaimdetails(this.mediclaim.getRawValue()).subscribe(
        (data:mediclaimDetails)=>{
          this.loader.stop();
          // console.log("save=>>>>>>"+data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Saved',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/insurance']);
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
      this.MediclamService.updatemediclaimdetails(this.mediclaim.getRawValue()).subscribe(
        (data:mediclaimDetails)=>{
          this.loader.stop();
          // console.log("update=>>>>>>"+data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Updated',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/insurance']);
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

  getmediclaimDetails(){
    this.MediclamService.getmediclaimdetails(this.user.id).subscribe(
      (data:mediclaimDetails)=>{
        this.mediclaimDetails = data;
         this.initializeForm();

      },
        (error)=>{
          console.log(error);
          this.defaultinitializeForm();
        }
        )
  }

  getpersonaldetails(){
    this.PersonaldetailsService.get(this.user.id).subscribe(
      (data:PersonalDetails)=>{
        this.personaldetails = data;
        this.url = userdocumenturl+this.user.id+"/" + this.personaldetails.signaturename; 
      },
        (error)=>{
          console.log(error);
        },
        ()=>{
          this.getmediclaimDetails();
        }
        )
  }

  initializeForm(){
    this.mediclaim.patchValue({
      id:this.mediclaimDetails.id,
      muser:{id:this.mediclaimDetails.muser.id},
      name: this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
      management:this.mediclaimDetails.management,
      email:this.personaldetails.email,
      address:this.personaldetails.permanentaddress.houseNo +" "+this.personaldetails.permanentaddress.location+" "+this.personaldetails.permanentaddress.city+" "+this.personaldetails.permanentaddress.state,
      mobile:this.personaldetails.contact,
      erp:this.mediclaimDetails.erp,
      doj:this.mediclaimDetails.doj,
      dept:this.mediclaimDetails.dept,
      designation:this.mediclaimDetails.designation,
      alternateno:this.mediclaimDetails.alternateno,
      r1c2:this.mediclaimDetails.r1c2,
    r1c3:this.mediclaimDetails.r1c3,
    r1c4:this.mediclaimDetails.r1c4,
    r1c5:this.mediclaimDetails.r1c5,
    r1c6:this.mediclaimDetails.r1c6,
    r2c2:this.mediclaimDetails.r2c2,
    r2c3:this.mediclaimDetails.r2c3,
    r2c4:this.mediclaimDetails.r2c4,
    r2c5:this.mediclaimDetails.r2c5,
    r2c6:this.mediclaimDetails.r2c6,
    r3c2:this.mediclaimDetails.r3c2,
    r3c3:this.mediclaimDetails.r3c3,
    r3c4:this.mediclaimDetails.r3c4,
    r3c5:this.mediclaimDetails.r3c5,
    r3c6:this.mediclaimDetails.r3c6,
    r4c2:this.mediclaimDetails.r4c2,
    r4c3:this.mediclaimDetails.r4c3,
    r4c4:this.mediclaimDetails.r4c4,
    r4c5:this.mediclaimDetails.r4c5,
    r4c6:this.mediclaimDetails.r4c6,
    r5c2:this.mediclaimDetails.r5c2,
    r5c3:this.mediclaimDetails.r5c3,
    r5c4:this.mediclaimDetails.r5c4,
    r5c5:this.mediclaimDetails.r5c5,
    r5c6:this.mediclaimDetails.r5c6,
    r6c2:this.mediclaimDetails.r6c2,
    r6c3:this.mediclaimDetails.r6c3,
    r6c4:this.mediclaimDetails.r6c4,
    r6c5:this.mediclaimDetails.r6c5,
    r6c6:this.mediclaimDetails.r6c6,
    place:this.mediclaimDetails.place,
    date:this.mediclaimDetails.date,
  
     
    })
  }

  defaultinitializeForm(){
    this.mediclaim.patchValue({
       name: this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
      // management:this.mediclaimDetails.management,
      email:this.personaldetails.email,
      address:this.personaldetails.permanentaddress.houseNo +" "+this.personaldetails.permanentaddress.location+" "+this.personaldetails.permanentaddress.city+" "+this.personaldetails.permanentaddress.state,
      mobile:this.personaldetails.contact,
      // erp:this.mediclaimDetails.erp,
      // doj:this.mediclaimDetails.doj,
      // dept:this.mediclaimDetails.dept,
      // designation:this.mediclaimDetails.designation,
      // alternateno:this.mediclaimDetails.alternateno,
      // r1c2:this.mediclaimDetails.r1c2,
    // r1c3:this.mediclaimDetails.r1c3,
    // r1c4:this.mediclaimDetails.r1c4,
    // r1c5:this.mediclaimDetails.r1c5,
    // r1c6:this.mediclaimDetails.r1c6,
    // r2c2:this.mediclaimDetails.r2c2,
    // r2c3:this.mediclaimDetails.r2c3,
    // r2c4:this.mediclaimDetails.r2c4,
    // r2c5:this.mediclaimDetails.r2c5,
    // r2c6:this.mediclaimDetails.r2c6,
    // r3c2:this.mediclaimDetails.r3c2,
    // r3c3:this.mediclaimDetails.r3c3,
    // r3c4:this.mediclaimDetails.r3c4,
    // r3c5:this.mediclaimDetails.r3c5,
    // r3c6:this.mediclaimDetails.r3c6,
    // r4c2:this.mediclaimDetails.r4c2,
    // r4c3:this.mediclaimDetails.r4c3,
    // r4c4:this.mediclaimDetails.r4c4,
    // r4c5:this.mediclaimDetails.r4c5,
    // r4c6:this.mediclaimDetails.r4c6,
    // r5c2:this.mediclaimDetails.r5c2,
    // r5c3:this.mediclaimDetails.r5c3,
    // r5c4:this.mediclaimDetails.r5c4,
    // r5c5:this.mediclaimDetails.r5c5,
    // r5c6:this.mediclaimDetails.r5c6,
    // r6c2:this.mediclaimDetails.r6c2,
    // r6c3:this.mediclaimDetails.r6c3,
    // r6c4:this.mediclaimDetails.r6c4,
    // r6c5:this.mediclaimDetails.r6c5,
    // r6c6:this.mediclaimDetails.r6c6,
    // place:this.mediclaimDetails.place,
    date:new Date(),
     
    })
  }
}
