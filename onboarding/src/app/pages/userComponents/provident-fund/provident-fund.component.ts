import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { PfdetailsService } from 'src/app/services/pfdetails.service';
import {userdocumenturl} from 'src/app/services/helper';
import { PersonalDetails } from 'src/models/personalDetails';
import { BankdetailsService } from 'src/app/services/bankdetails.service';
import { bank } from 'src/models/bankDetails';
import { DatePipe } from '@angular/common'
import { user } from 'src/models/user';
import { FormStatusService } from 'src/app/services/form-status.service';
import { formstatus } from 'src/models/formStatus';
import { ProvidentFund } from 'src/models/ProvidentFundModel';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-provident-fund',
  templateUrl: './provident-fund.component.html',
  styleUrls: ['./provident-fund.component.css']
})
export class ProvidentFundComponent implements OnInit, AfterViewInit  {
  public user: user;
  // public userdata:any;
  public personaldetails:PersonalDetails = new PersonalDetails() ;
  formStatusdetails: formstatus = new formstatus();
  public bankdetails:bank = new bank();
  public url:String;
  pfData : ProvidentFund = new ProvidentFund();

  constructor(private fb: FormBuilder,    private toast: NgToastService,
    private loader: LoaderService,public datepipe: DatePipe,private bankservice:BankdetailsService,private login:LoginService,private PersonaldetailsService:PersonaldetailsService ,private pfservice:PfdetailsService,private router:Router,private formstatusservice:FormStatusService ) { }
  
 
  pf:FormGroup= this.fb.group({
   id:'',
   pfuser:{},
   name:[{value:'',disabled:true},[Validators.required]],
   checkboxname:['',[Validators.required]],
   checkboxvalue:['',[Validators.required]],
   dob:[{value:'',disabled:true},[Validators.required]],
   gender:[{value:'',disabled:true},[Validators.required]],
   maritalstatus:[{value:'',disabled:true},[Validators.required]],
   emailid:[{value:'',disabled:true},[Validators.required]],
   mobile:[{value:'',disabled:true},[Validators.required]],
   providentfundscheme:['',[Validators.required]],
   pensionscheme:['',[Validators.required]],
   uan: [{ value: '', disabled: true }, [Validators.required]],
   previouspfno: [{ value: '', disabled: true }, [Validators.required]],
   dateofexit: [{ value: '', disabled: true }, [Validators.required]],
   schemecertno: [{ value: '', disabled: true }, [Validators.required]],
   ppo: [{ value: '', disabled: true }, [Validators.required]],
   internationalworker:['',[Validators.required]],
   country:[{ value: '', disabled: true }, [Validators.required]],
   passportno:[{value:'',disabled:true},[Validators.required]],
   validity:[{value:'',disabled:true},[Validators.required]],
   bankaccountandifsc:[{value:'',disabled:true},[Validators.required]],
   aadharcard:[{value:'',disabled:true},[Validators.required]],
   panno:[{value:'',disabled:true},[Validators.required]],
   empcode:[''],
   company:[''],
   date:[{value:'',disabled:true},[Validators.required]],
   place:['',[Validators.required]],
   date1:[{value:'',disabled:true},[Validators.required]],
   name1:[''],
   date3:[''],
   pfno:[''],
   uan1:[''],
   checkbox1:[''],
   checkbox2:['']
  });

  ngOnInit(): void {
   
    //  td = this.datepipe.transform(new Date(), 'dd/MM/yyyy'),
    this.user = this.login.getuser();
    this.getpersonaldetails();
    this.getFormStatus();
    // this.getbankdetails();
    
    this.pf.get('providentfundscheme').valueChanges.subscribe((data) => {
      if (this.formStatusdetails.provident=='2') {
        this.pf.get('uan').disable();
        this.pf.get('previouspfno').disable();
        this.pf.get('dateofexit').disable();
        this.pf.get('ppo').disable();
        this.pf.get('schemecertno').disable();
      } else if((data == 'Yes') || (this.pf.get('pensionscheme').value=='Yes') ){
        this.pf.get('uan').enable();
        this.pf.get('previouspfno').enable();
        this.pf.get('dateofexit').enable();
        this.pf.get('ppo').enable();
        this.pf.get('schemecertno').enable();
      }
      else {
        this.pf.get('uan').disable();
        this.pf.get('previouspfno').disable();
        this.pf.get('dateofexit').disable();
        this.pf.get('ppo').disable();
        this.pf.get('schemecertno').disable();
      }
    });
    this.pf.get('pensionscheme').valueChanges.subscribe((data) => {
      if (this.formStatusdetails.provident=='2' ) {
        this.pf.get('uan').disable();
        this.pf.get('previouspfno').disable();
        this.pf.get('dateofexit').disable();
        this.pf.get('ppo').disable();
        this.pf.get('schemecertno').disable();
      } else if((data == 'Yes') || (this.pf.get('providentfundscheme').value=='Yes')){
        this.pf.get('uan').enable();
        this.pf.get('previouspfno').enable();
        this.pf.get('dateofexit').enable();
        this.pf.get('ppo').enable();
        this.pf.get('schemecertno').enable();
      }
      
      else {
        this.pf.get('uan').disable();
        this.pf.get('previouspfno').disable();
        this.pf.get('dateofexit').disable();
        this.pf.get('ppo').disable();
        this.pf.get('schemecertno').disable();
      }
    });

    this.pf.get('internationalworker').valueChanges.subscribe((data) => {
      if (data == null || data == 'Yes') {
        this.pf.get('country').enable();
      } else {
        this.pf.get('country').disable();
      }
    });

  }

  ngAfterViewInit(): void {
   
  }



  getFormStatus(){
    this.formstatusservice.getformstate(this.user.id).subscribe(
      (data:formstatus)=>{
        if(data!=null){
          this.formStatusdetails = data;
          if(this.formStatusdetails.provident=='2'){
            this.pf.disable();
          }
        }
        
      },
        (error)=>{
          console.log(error);
        }
        )
  }

  Submit(){
    if(this.pf.value.id==''){
      this.pf.value.pfuser['id'] = this.user.id;
      this.loader.start();
      this.pfservice.savepfdetails(this.pf.getRawValue()).subscribe(
        (data)=>{
          this.loader.stop();
          // console.log("save=>>>>>>"+data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Saved',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/gratuity']);
          this.formstatusservice.formstatusSubject.next(true);
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
      this.pfservice.updatepfdetails(this.pf.getRawValue()).subscribe(
        (data)=>{
          this.loader.stop();
          // console.log("update=>>>>>>"+data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Updated',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/gratuity']);
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

  getuser():void{
    this.pfservice.getpfdetails(this.user.id).subscribe(
      (data:ProvidentFund)=>{
        this.pfData = data;
        this.initializeForm(this.pfData);
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
          this.getbankdetails();
        }
    )
      
  }
  // .pipe(finalize(() => this.getuser()) )
 getbankdetails(){
 
   this.bankservice.getbankdetails(this.user.id).subscribe(
    (data:bank)=>{
      // console.log(data);  
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


  initializeForm(pfund:ProvidentFund){
    this.pf.patchValue({
      id:pfund.id,
      pfuser:{id:pfund.pfuser.id},
      name: this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
      checkboxname: pfund.checkboxname,
      checkboxvalue: pfund.checkboxvalue,
      dob: this.personaldetails.dob,
      gender: this.personaldetails.gender,
      maritalstatus: this.personaldetails.maritalstatus,
      emailid: this.personaldetails.email,
      mobile: this.personaldetails.contact,
      providentfundscheme: pfund.providentfundscheme,
      pensionscheme: pfund.pensionscheme,
      uan: pfund.uan,
      previouspfno: pfund.previouspfno,
      dateofexit: pfund.dateofexit,
      schemecertno: pfund.schemecertno,
      ppo: pfund.ppo,
      internationalworker: pfund.internationalworker,
      country: pfund.country,
      passportno: this.personaldetails.passportDetails.passportNumber ?this.personaldetails.passportDetails.passportNumber :"" ,
      validity: (this.personaldetails.passportDetails.dateofissue && this.personaldetails.passportDetails.dateofexpiry)? this.datepipe.transform(this.personaldetails.passportDetails.dateofissue , 'dd/MM/yyyy') +" to "+ this.datepipe.transform(this.personaldetails.passportDetails.dateofexpiry , 'dd/MM/yyyy'):"",
      bankaccountandifsc: this.bankdetails.extras[0].bankaccountno +" "+ this.bankdetails.extras[0].ifsccode,
      aadharcard: this.personaldetails.panAndaadhar.aadharNumber,
      panno:this.personaldetails.panAndaadhar.panNumber,
      empcode:pfund.empcode,
      company:pfund.company,
      date:pfund.date,
      place:pfund.place,
      date1:pfund.date1,
      name1:pfund.name1,
      date3:pfund.date3,
      pfno:pfund.pfno,
      uan1:pfund.uan1,
      checkbox1:pfund.checkbox1,
      checkbox2:pfund.checkbox2,
    })
  }


  defaultinitializeForm(){
  
    this.pf.patchValue({
      name: this.personaldetails.firstname +" "+ this.personaldetails.middlename +" "+this.personaldetails.lastname,
      // checkboxname: this.userdata.checkboxname,
      // checkboxvalue: this.userdata.checkboxvalue,
      dob: this.personaldetails.dob,
      // dob: this.datepipe.transform(this.personaldetails.dob, 'dd/MM/yyyy'),
      gender: this.personaldetails.gender,
      maritalstatus: this.personaldetails.maritalstatus,
      emailid: this.personaldetails.email,
      mobile: this.personaldetails.contact,
      // providentfundscheme: this.userdata.providentfundscheme,
      // pensionscheme: this.userdata.pensionscheme,
      // uan: this.userdata.uan,
      // previouspfno: this.userdata.previouspfno,
      // dateofexit: this.userdata.dateofexit,
      // schemecertno: this.userdata.schemecertno,
      // ppo: this.userdata.ppo,
      // internationalworker: this.userdata.internationalworker,
      // country: this.userdata.country,
      passportno: this.personaldetails.passportDetails.passportNumber ?this.personaldetails.passportDetails.passportNumber :"" ,

      validity: (this.personaldetails.passportDetails.dateofissue && this.personaldetails.passportDetails.dateofexpiry)? this.datepipe.transform(this.personaldetails.passportDetails.dateofissue , 'dd/MM/yyyy') +" to "+ this.datepipe.transform(this.personaldetails.passportDetails.dateofexpiry , 'dd/MM/yyyy'):"",

      bankaccountandifsc: this.bankdetails.extras[0].bankaccountno +" "+ this.bankdetails.extras[0].ifsccode,
      aadharcard: this.personaldetails.panAndaadhar.aadharNumber,
      panno:this.personaldetails.panAndaadhar.panNumber,
      // empcode:this.userdata.empcode,
      // company:this.userdata.company,
      date:new Date(),
      // place:this.userdata.place,
      date1:new Date(),
      // name1:this.userdata.name1,
      // date3:this.userdata.date3,
      // pfno:this.userdata.pfno,
      // uan1:this.userdata.uan1,
      // checkbox1:this.userdata.checkbox1,
      // checkbox2:this.userdata.checkbox2,
    })
  }

}
