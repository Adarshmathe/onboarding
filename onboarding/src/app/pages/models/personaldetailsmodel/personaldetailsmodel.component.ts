import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
} from '@angular/forms';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalDetails } from 'src/models/personalDetails';
import {
  modeldata,
} from 'src/models/utils';
import { PreviewModelComponent } from '../preview-model/preview-model.component';
import { FormStatusService } from 'src/app/services/form-status.service';
import { formstatus } from 'src/models/formStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-personaldetailsmodel',
  templateUrl: './personaldetailsmodel.component.html',
  styleUrls: ['./personaldetailsmodel.component.css'],
})
export class PersonaldetailsmodelComponent implements OnInit {
  // public user: any;
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  public userdata: PersonalDetails = new PersonalDetails();
  // private reader: FileReader;
  // public Nationality:string[]=Nationality();
  // public countries;
  // public states;
  // public cities;
  // public districts;
  // public states1;
  // public cities1;
  // public districts1;
  // public states2;
  // public cities2;
  // public districts2;
  // public titles:string[]= titles();
  // public options:string[]= options();
  // public gender:string[]= gender();

  // public maritalstatus:string[]= maritalstatus();
  // private validation = new AppValidation();

  constructor(
    private fb: FormBuilder,
    private PersonaldetailsService: PersonaldetailsService,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    public dialog: MatDialog,
    private formstatusservice: FormStatusService,
    private toast: NgToastService
  ) {}

  // public isSameAddressControl: FormControl = new FormControl(false);

  // personal:FormGroup= this.fb.group({
  //   id:'',
  //   user:{},

  //   title: [null,[Validators.required]],
  //   firstname: ['',[Validators.required]],
  //   middlename: '',
  //   lastname: ['',[Validators.required]],
  //   gender: [null,[Validators.required]],
  //   dob: ['',[Validators.required]],
  //   nationality: [null,[Validators.required]],
  //   language:['',[Validators.required]],
  //   maritalstatus: [null,[Validators.required]],
  //   marriagedate: [{value:'',disabled:true},[Validators.required]],
  //   religion: ['',[Validators.required]],
  //   email: ['',[Validators.required,Validators.email]],
  //   contact: ['',[Validators.required]],
  //   exservicemen: [null,[Validators.required]],
  //   caste: ['',[Validators.required]],
  //   image:['',[Validators.required]],
  //   imagedata:'',
  //   imagedatatype:'',
  //   imagedataname:'',
  //   signature:['',[Validators.required]],
  //   signaturedata:'',
  //   signaturetype:'',
  //   signaturename:'',

  // permanentaddress: this.fb.group({
  //   houseNo: ['',[Validators.required]],
  //   location: ['',[Validators.required]],
  //   city: [null,[Validators.required]],
  //   country: [null,[Validators.required]],
  //   state: [null,[Validators.required]],
  //   district: [null,[Validators.required]],
  //   postalCode: ['',[Validators.required]],
  //   countryid:'',
  //   stateid:''

  // }),
  // currentaddress: this.fb.group({
  //   chouseNo: ['',[Validators.required]],
  //   clocation: ['',[Validators.required]],
  //   ccity: [null,[Validators.required]],
  //   ccountry: [null,[Validators.required]],
  //   cstate: [null,[Validators.required]],
  //   cdistrict: [null,[Validators.required]],
  //   cpostalCode:['',[Validators.required]],
  //   ccountryid:'',
  //   cstateid:''
  // }),
  // passportDetails:this.fb.group({
  //   isavailable:'',
  //   passportNumber: [{value:'',disabled:true},[Validators.required]],
  //   placeofissue: [{value:'',disabled:true},[Validators.required]],
  //   issuingauth: [{value:'',disabled:true},[Validators.required]],
  //   dateofissue:[{value:'',disabled:true},[Validators.required]],
  //   dateofexpiry: [{value:'',disabled:true},[Validators.required]],
  //   visibledismark: [{value:'',disabled:true},[Validators.required]],
  //   phouseNo: [{value:'',disabled:true},[Validators.required]],
  //   parea: [{value:'',disabled:true},[Validators.required]],
  //   pcity: [{value:null,disabled:true},[Validators.required]],
  //   pstate: [{value:null,disabled:true},[Validators.required]],
  //   pdistrict:[{value:null,disabled:true},[Validators.required]],
  //   ppostalcode: [{value:'',disabled:true},[Validators.required]],
  //   passportfile:[{value:'',disabled:true},[Validators.required]],
  //   passportfiledata:'',
  //   passportfiletype:'',
  //   passportfilename:'',
  //   pstateid:''
  // }),
  // panAndaadhar:this.fb.group({
  //   panNumber:['',[Validators.required]],
  //   confirmpanNumber:['',[Validators.required,this.matchValidator('panNumber')]],
  //   pancardfile:['',[Validators.required]],
  //   pancardfiledata:'',
  //   pancardfiletype:'',
  //   pancardfilename:'',
  //   aadharNumber:['',[Validators.required]],
  //   confirmaadharNumber:['',[Validators.required,this.matchValidator('aadharNumber')]],
  //   aadharcardfile:['',[Validators.required]],
  //   aadharcardfiledata:'',
  //   aadharcardfiletype:'',
  //   aadharcardfilename:''
  // },
  // {
  //   validator: Validators.compose([
  //     checkMatchValidator('panNumber', 'confirmpanNumber'),
  //     checkMatchValidator('aadharNumber', 'confirmaadharNumber')
  //   ])
  // }
  // )
  // });

  ngOnInit(): void {
    // this.getCountries();
    // this.getStates2(101);
    // this.personal;
    this.getuser(this.data.id);
    this.getFormStatus(this.data.id);
    // this.isSameAddressControl
    // .valueChanges
    // .pipe(
    //   distinctUntilChanged(),
    //   switchMap(isSameAddress => {
    //     if (isSameAddress) {
    //       return this.personal
    //         .get('permanentaddress')
    //         .valueChanges
    //         .pipe(
    //           // at the beginning fill the form with the current values
    //           startWith(this.personal.get('permanentaddress').value),
    //           tap(value =>{
    //             // every time the sending address changes, update the billing address
    //             // this.personal
    //             //   .get('currentaddress')
    //             //   .setValue(value)
    //             this.personal.get('currentaddress.chouseNo').setValue(value.houseNo),
    //             this.personal.get('currentaddress.clocation').setValue(value.location),
    //             this.personal.get('currentaddress.ccity').setValue(value.city),
    //             this.personal.get('currentaddress.ccountry').setValue(value.country),
    //             this.personal.get('currentaddress.cstate').setValue(value.state),
    //             this.personal.get('currentaddress.cdistrict').setValue(value.district),
    //             this.personal.get('currentaddress.cpostalCode').setValue(value.postalCode),
    //             this.personal.get('currentaddress.ccountryid').setValue(value.countryid),
    //             this.personal.get('currentaddress.cstateid').setValue(value.stateid)

    //           }
    //           )
    //         )
    //     } else {
    //       this.personal
    //         .get('currentaddress')
    //         .reset();

    //       return EMPTY;
    //     }
    //   })
    //   // don't forget to unsubscribe when component's destroyed
    // )
    // .subscribe();

    // this.personal.get('passportDetails.isavailable').valueChanges.subscribe(v => {
    //   if (v) {
    //     this.personal.get('passportDetails.passportNumber').enable();
    //     this.personal.get('passportDetails.placeofissue').enable();
    //     this.personal.get('passportDetails.issuingauth').enable();
    //     this.personal.get('passportDetails.dateofissue').enable();
    //     this.personal.get('passportDetails.dateofexpiry').enable();
    //     this.personal.get('passportDetails.visibledismark').enable();
    //     this.personal.get('passportDetails.phouseNo').enable();
    //     this.personal.get('passportDetails.parea').enable();
    //     this.personal.get('passportDetails.pcity').enable();
    //     this.personal.get('passportDetails.pstate').enable();
    //     this.personal.get('passportDetails.pdistrict').enable();
    //     this.personal.get('passportDetails.ppostalcode').enable();
    //     this.personal.get('passportDetails.passportfile').enable();
    //   } else {
    //     this.personal.get('passportDetails.passportNumber').disable();
    //     this.personal.get('passportDetails.placeofissue').disable();
    //     this.personal.get('passportDetails.issuingauth').disable();
    //     this.personal.get('passportDetails.dateofissue').disable();
    //     this.personal.get('passportDetails.dateofexpiry').disable();
    //     this.personal.get('passportDetails.visibledismark').disable();
    //     this.personal.get('passportDetails.phouseNo').disable();
    //     this.personal.get('passportDetails.parea').disable();
    //     this.personal.get('passportDetails.pcity').disable();
    //     this.personal.get('passportDetails.pstate').disable();
    //     this.personal.get('passportDetails.pdistrict').disable();
    //     this.personal.get('passportDetails.ppostalcode').disable();
    //     this.personal.get('passportDetails.passportfile').disable();
    //   };
    // })

    //   this.personal.get('maritalstatus').valueChanges.subscribe(data=>{

    //     if(data==null || data=='Single'){
    //       this.personal.get('marriagedate').disable();
    //     }else{
    //       this.personal.get('marriagedate').enable();
    //     }

    //   })
  }

  getFormStatus(id) {
    this.formstatusservice.getformstate(id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.initialization(data);
          if (this.formStatusdetails.personal == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.personal == '2') {
            this.checkbox = false;
          } else {
            this.disable = true;
          }
        } else {
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
      this.formStatusdetails.personal = '1';
    } else {
      this.formStatusdetails.personal = '2';
    }

    this.formstatusservice.updateformstate(this.formStatusdetails).subscribe(
      (data: formstatus) => {
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
        // verticalPosition: 'top'})
        this.toast.error({
          detail: 'Error',
          summary: error.message,
          duration: 3000,
        });
      }
    );
  }

  // public getCountries():void{
  // this.PersonaldetailsService.getCountries().subscribe(
  //   (data)=>{
  //     this.countries = data;
  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // )
  // }

  // onCountryChange(e){
  // this.personal.get('permanentaddress.countryid').setValue(e.id)
  // this.personal.get('permanentaddress.state').setValue(null)
  // this.personal.get('permanentaddress.city').setValue(null)
  // this.personal.get('permanentaddress.district').setValue(null)

  //  this.getStates(e.id);
  // }

  // onCountryChange1(e){
  // this.personal.get('currentaddress.ccountryid').setValue(e.id)
  // this.personal.get('currentaddress.cstate').setValue(null)
  // this.personal.get('currentaddress.ccity').setValue(null)
  // this.personal.get('currentaddress.cdistrict').setValue(null)

  //  this.getStates1(e.id);
  // }

  // public getStates(id):void{
  // this.PersonaldetailsService.getStates(id).subscribe(
  //   (data)=>{
  //     this.states = data;
  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // )
  // }
  // public getStates1(id):void{
  // this.PersonaldetailsService.getStates(id).subscribe(
  //   (data)=>{
  //     this.states1 = data;
  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // )
  // }
  // public getStates2(id):void{
  // this.PersonaldetailsService.getStates(id).subscribe(
  //   (data)=>{
  //     this.states2 = data;
  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // )
  // }

  // onStateChange(e){
  // this.personal.get('permanentaddress.stateid').setValue(e.id)
  // this.personal.get('permanentaddress.city').setValue(null)
  // this.personal.get('permanentaddress.district').setValue(null)
  // this.getCities(e.id)
  // this.getDistricts(e.id)
  // }
  // onStateChange1(e){
  // this.personal.get('currentaddress.cstateid').setValue(e.id)
  // this.personal.get('currentaddress.ccity').setValue(null)
  // this.personal.get('currentaddress.cdistrict').setValue(null)
  // this.getCities1(e.id)
  // this.getDistricts1(e.id)
  // }
  // onStateChange2(e){
  // this.personal.get('passportDetails.pstateid').setValue(e.id)
  // this.personal.get('passportDetails.pdistrict').setValue(null)
  // this.personal.get('passportDetails.pcity').setValue(null)
  // this.getCities2(e.id)
  // this.getDistricts2(e.id)
  // }

  // public getCities(id):void{
  // this.PersonaldetailsService.getCities(id).subscribe(
  //   (data)=>{
  //     this.cities = data;

  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // )
  // }

  // public getDistricts(id):void{
  // this.PersonaldetailsService.getDistricts(id).subscribe(
  //   (data)=>{
  //     this.districts = data;
  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // )
  // }
  // public getCities1(id):void{
  // this.PersonaldetailsService.getCities(id).subscribe(
  //   (data)=>{
  //     this.cities1 = data;

  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // )
  // }

  // public getDistricts1(id):void{
  // this.PersonaldetailsService.getDistricts(id).subscribe(
  //   (data)=>{
  //     this.districts1 = data;
  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // )
  // }
  // public getCities2(id):void{
  // this.PersonaldetailsService.getCities(id).subscribe(
  //   (data)=>{
  //     this.cities2 = data;

  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // )
  // }

  // public getDistricts2(id):void{
  // this.PersonaldetailsService.getDistricts(id).subscribe(
  //   (data)=>{
  //     this.districts2 = data;
  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // )
  // }

  // Submit(){

  // if(this.personal.value.id==''){
  // this.personal.value.user['id'] = this.data.id;
  // this.PersonaldetailsService.savepersonalDetails(this.personal.value).subscribe(
  //   (data)=>{
  //     console.log("save=>>>>>>"+data);
  //   }
  //     ,
  //     (error)=>{
  //       console.log(error);

  //     }
  // )

  // }else{
  // this.PersonaldetailsService.updatepersonalDetails(this.personal.value).subscribe(
  //   (data)=>{
  //     console.log("update=>>>>>>"+data);
  //   }
  //     ,
  //     (error)=>{
  //       console.log(error);

  //     }
  // )

  // }

  // }

  getuser(id) {
    this.PersonaldetailsService.get(id).subscribe(
      (data: PersonalDetails) => {
        if (data != null) {
          this.userdata = data;
        }
        // if(this.userdata != null){
        //   this.initializeForm();

        // }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // initializeForm(){
  // this.personal.patchValue({
  //   id:this.userdata.id,
  //   title: this.userdata.title,
  //   firstname: this.userdata.firstname,
  //   middlename: this.userdata.middlename,
  //   lastname: this.userdata.lastname,
  //   gender: this.userdata.gender,
  //   dob: this.userdata.dob,
  //   nationality: this.userdata.nationality,
  //   language: this.userdata.language,
  //   maritalstatus: this.userdata.maritalstatus,
  //   marriagedate: this.userdata.marriagedate,
  //   religion: this.userdata.religion,
  //   email: this.userdata.email,
  //   contact: this.userdata.contact,
  //   exservicemen: this.userdata.exservicemen,
  //   caste: this.userdata.caste,
  //   permanentaddress: {
  //     houseNo: this.userdata.permanentaddress.houseNo,
  //     location: this.userdata.permanentaddress.location,
  //     city: this.userdata.permanentaddress.city,
  //     country: this.userdata.permanentaddress.country,
  //     state: this.userdata.permanentaddress.state,
  //     district: this.userdata.permanentaddress.district,
  //     postalCode: this.userdata.permanentaddress.postalCode,
  //     countryid:this.userdata.permanentaddress.countryid,
  //     stateid:this.userdata.permanentaddress.stateid

  //   },
  //   currentaddress: {
  //     chouseNo: this.userdata.currentaddress.chouseNo,
  //     clocation: this.userdata.currentaddress.clocation,
  //     ccity: this.userdata.currentaddress.ccity,
  //     ccountry: this.userdata.currentaddress.ccountry,
  //     cstate: this.userdata.currentaddress.cstate,
  //     cdistrict: this.userdata.currentaddress.cdistrict,
  //     cpostalCode: this.userdata.currentaddress.cpostalCode,
  //     ccountryid:this.userdata.currentaddress.ccountryid,
  //     cstateid:this.userdata.currentaddress.cstateid
  //   },
  //   passportDetails: {
  //     isavailable: this.userdata.passportDetails.isavailable,
  //     passportNumber: this.userdata.passportDetails.passportNumber,
  //     placeofissue: this.userdata.passportDetails.placeofissue,
  //     issuingauth: this.userdata.passportDetails.issuingauth,
  //     dateofissue: this.userdata.passportDetails.dateofissue,
  //     dateofexpiry: this.userdata.passportDetails.dateofexpiry,
  //     visibledismark: this.userdata.passportDetails.visibledismark,
  //     phouseNo: this.userdata.passportDetails.phouseNo,
  //     parea: this.userdata.passportDetails.parea,
  //     pcity: this.userdata.passportDetails.pcity,
  //     pstate: this.userdata.passportDetails.pstate,
  //     pdistrict: this.userdata.passportDetails.pdistrict,
  //     ppostalcode: this.userdata.passportDetails.ppostalcode,
  //     passportfiletype:this.userdata.passportDetails.passportfiletype,
  //     passportfilename:this.userdata.passportDetails.passportfilename,
  //     pstateid: this.userdata.passportDetails.pstateid,
  //   },
  //   panAndaadhar: {
  //     panNumber: this.userdata.panAndaadhar.panNumber,
  //     confirmpanNumber: this.userdata.panAndaadhar.confirmpanNumber,
  //     aadharNumber: this.userdata.panAndaadhar.aadharNumber,
  //     confirmaadharNumber: this.userdata.panAndaadhar.confirmaadharNumber,
  //     pancardfiletype:this.userdata.panAndaadhar.pancardfiletype,
  //     pancardfilename:this.userdata.panAndaadhar.pancardfilename,
  //     aadharcardfiletype:this.userdata.panAndaadhar.aadharcardfiletype,
  //     aadharcardfilename:this.userdata.panAndaadhar.aadharcardfilename
  //   },
  //   user: {
  //     id:this.userdata.user.id
  //   }
  //  })

  //  this.getStates(this.userdata.permanentaddress.countryid);
  //  this.getDistricts(this.userdata.permanentaddress.stateid);
  //  this.getCities(this.userdata.permanentaddress.stateid);
  //  this.getStates1(this.userdata.currentaddress.ccountryid,);
  //  this.getDistricts1(this.userdata.currentaddress.cstateid);
  //  this.getCities1(this.userdata.currentaddress.cstateid);
  //  this.getCities2(this.userdata.passportDetails.pstateid);
  //  this.getDistricts2(this.userdata.passportDetails.pstateid);

  //  if(this.personal.get('passportDetails.isavailable').value=='false'){
  //   this.personal.get('passportDetails.passportNumber').disable();
  //   this.personal.get('passportDetails.placeofissue').disable();
  //   this.personal.get('passportDetails.issuingauth').disable();
  //   this.personal.get('passportDetails.dateofissue').disable();
  //   this.personal.get('passportDetails.dateofexpiry').disable();
  //   this.personal.get('passportDetails.visibledismark').disable();
  //   this.personal.get('passportDetails.phouseNo').disable();
  //   this.personal.get('passportDetails.parea').disable();
  //   this.personal.get('passportDetails.pcity').disable();
  //   this.personal.get('passportDetails.pstate').disable();
  //   this.personal.get('passportDetails.pdistrict').disable();
  //   this.personal.get('passportDetails.ppostalcode').disable();
  //   this.personal.get('passportDetails.passportfile').disable();
  // }else{

  //   this.personal.get('passportDetails.passportNumber').enable();
  //   this.personal.get('passportDetails.placeofissue').enable();
  //   this.personal.get('passportDetails.issuingauth').enable();
  //   this.personal.get('passportDetails.dateofissue').enable();
  //   this.personal.get('passportDetails.dateofexpiry').enable();
  //   this.personal.get('passportDetails.visibledismark').enable();
  //   this.personal.get('passportDetails.phouseNo').enable();
  //   this.personal.get('passportDetails.parea').enable();
  //   this.personal.get('passportDetails.pcity').enable();
  //   this.personal.get('passportDetails.pstate').enable();
  //   this.personal.get('passportDetails.pdistrict').enable();
  //   this.personal.get('passportDetails.ppostalcode').enable();
  //   this.personal.get('passportDetails.passportfile').enable();
  // }

  // }

  // _keyPress(event: any) {
  // this.validation.allowedNumberOnly(event);
  // }
  // _keyPress1(event: any) {
  // this.validation.allowedwordsOnly(event);
  // }

  // onselectFile(e){

  // if (e.target.files[0].type.indexOf('image') == -1 && e.target.files[0].type.indexOf('pdf') == -1) {
  //   alert('Only (jpg, png, pdf) are allowed.');
  //   return;
  // }else if(e.target.files[0].type.indexOf('pdf') != -1) {

  //   this.personal.get('panAndaadhar.pancardfiletype').setValue("pdf");

  // }else if(e.target.files[0].type.indexOf('image') != -1) {

  //   this.personal.get('panAndaadhar.pancardfiletype').setValue("image");

  // }

  // this.reader = new FileReader();
  // this.reader.readAsDataURL(e.target.files[0]);

  // this.reader.onload= (event:any)=>{

  // this.personal.get('panAndaadhar.pancardfiledata').setValue(event.target.result);

  // }
  // }

  // onselectFile1(e){

  //   if (e.target.files[0].type.indexOf('image') == -1 && e.target.files[0].type.indexOf('pdf') == -1) {
  //     alert('Only (jpg, png, pdf) are allowed.');
  //     return;
  //   }else if(e.target.files[0].type.indexOf('pdf') != -1) {

  //     this.personal.get('panAndaadhar.aadharcardfiletype').setValue("pdf");

  //   }else if(e.target.files[0].type.indexOf('image') != -1) {

  //     this.personal.get('panAndaadhar.aadharcardfiletype').setValue("image");

  //   }

  //   this.reader = new FileReader();
  //   this.reader.readAsDataURL(e.target.files[0]);

  // this.reader.onload= (event:any)=>{

  //   this.personal.get('panAndaadhar.aadharcardfiledata').setValue(event.target.result);

  // }

  //   }

  //   onselectFile2(e){

  //     if (e.target.files[0].type.indexOf('image') == -1 && e.target.files[0].type.indexOf('pdf') == -1) {
  //       alert('Only (jpg, png, pdf) are allowed.');
  //       return;
  //     }else if(e.target.files[0].type.indexOf('pdf') != -1) {

  //       this.personal.get('passportDetails.passportfiletype').setValue("pdf");

  //     }else if(e.target.files[0].type.indexOf('image') != -1) {

  //       this.personal.get('passportDetails.passportfiletype').setValue("image");

  //     }

  //     this.reader = new FileReader();
  //     this.reader.readAsDataURL(e.target.files[0]);

  //   this.reader.onload= (event:any)=>{

  //     this.personal.get('passportDetails.passportfiledata').setValue(event.target.result);

  //   }

  //     }
  //     onselectFile3(e){

  //       if (e.target.files[0].type.indexOf('image') == -1 && e.target.files[0].type.indexOf('pdf') == -1) {
  //         alert('Only (jpg, png, pdf) are allowed.');
  //         return;
  //       }else if(e.target.files[0].type.indexOf('pdf') != -1) {

  //         this.personal.get('imagedatatype').setValue("pdf");

  //       }else if(e.target.files[0].type.indexOf('image') != -1) {

  //         this.personal.get('imagedatatype').setValue("image");

  //       }

  //       this.reader = new FileReader();
  //       this.reader.readAsDataURL(e.target.files[0]);

  //     this.reader.onload= (event:any)=>{

  //       this.personal.get('imagedata').setValue(event.target.result);

  //     }

  //       }
  //       onselectFile4(e){

  //         if (e.target.files[0].type.indexOf('image') == -1 && e.target.files[0].type.indexOf('pdf') == -1) {
  //           alert('Only (jpg, png, pdf) are allowed.');
  //           return;
  //         }else if(e.target.files[0].type.indexOf('pdf') != -1) {

  //           this.personal.get('signaturetype').setValue("pdf");

  //         }else if(e.target.files[0].type.indexOf('image') != -1) {

  //           this.personal.get('signaturetype').setValue("image");

  //         }

  //         this.reader = new FileReader();
  //         this.reader.readAsDataURL(e.target.files[0]);

  //       this.reader.onload= (event:any)=>{

  //         this.personal.get('signaturedata').setValue(event.target.result);

  //       }

  //         }

  //         matchValidator(controlValidationName: string): ValidatorFn {
  //           return (control: AbstractControl) => {

  //           if(typeof control === 'undefined' || control === null
  //           || typeof control.value === 'undefined' || control.value === null) {
  //               return {
  //                   required: true
  //               }
  //           }

  //           const stateName: string = control.value.trim();
  //           var stateName2:string;
  //           let isPrimaryControl: AbstractControl = null;

  //           const parentFormGroup: FormGroup = <FormGroup>control.parent;

  //           if(typeof parentFormGroup !== 'undefined' && parentFormGroup !== null) {
  //             isPrimaryControl = (<FormGroup>control.parent).get(controlValidationName);
  //             stateName2 = isPrimaryControl.value;

  //           } else {
  //             // console.log('Parent control is undefined.');
  //           }

  //           if(typeof isPrimaryControl === 'undefined' || isPrimaryControl === null||
  //           typeof isPrimaryControl.value === 'undefined' || isPrimaryControl.value === null) {
  //               return {
  //                   invalidFlag: true
  //               }
  //           }
  //           return stateName !== stateName2 ?
  //               { matchValidator: { value: control.value } } : null;
  //          }
  //
  // }

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
