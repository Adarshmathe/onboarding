import {  Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {  Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { distinctUntilChanged, switchMap, startWith, tap, EMPTY } from 'rxjs';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { FormStatusService } from 'src/app/services/form-status.service';

import { LoginService } from 'src/app/services/login.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import {
  AppValidation,
  checkMatchValidator,
  checkPanNumberValidation,
} from 'src/app/services/validation';
import { city, country, district, state } from 'src/models/Country';
import { formstatus } from 'src/models/formStatus';
import { PersonalDetails } from 'src/models/personalDetails';
import { user } from 'src/models/user';
import {
  gender,
  maritalstatus,
  Nationality,
  options,
  titles,
} from 'src/models/utils';

@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.css'],
})
export class PersonaldetailsComponent implements OnInit {
  errormsg: string;
  public user: user;
  public formStatusdetails: formstatus;
  public PersonalDetails: PersonalDetails;
  private reader: FileReader;
  public Nationality: string[] = Nationality();
  public countries:country[] = [];
  public states:state[] = [];
  public cities:city[] = [];
  public districts:district[] = [];
  public states1:state[] = [];
  public cities1:city[] = [];
  public districts1:district[] = [];
  public states2:state[] = [];
  public cities2:city[] = [];
  public districts2:district[] = [];
  public titles: string[] = titles();
  public options: string[] = options();
  public gender: string[] = gender();

  public maritalstatus: string[] = maritalstatus();
  private validation = new AppValidation();
  constructor(
    private fb: FormBuilder,
    private PersonaldetailsService: PersonaldetailsService,
    private login: LoginService,
    private router: Router,
    private formstatus: FormStatusService,
    private loader: LoaderService,
    private toast: NgToastService,
  ) {}

  public isSameAddressControl: FormControl = new FormControl(false);

  personal: FormGroup = this.fb.group({
    id: '',
    user: {},
    title: [null, [Validators.required]],
    firstname: ['', [Validators.required]],
    middlename: '',
    lastname: ['', [Validators.required]],
    gender: [null, [Validators.required]],
    dob: ['', [Validators.required]],
    nationality: [null, [Validators.required]],
    language: ['', [Validators.required]],
    maritalstatus: [null, [Validators.required]],
    marriagedate: [{ value: '', disabled: true }, [Validators.required]],
    religion: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contact: ['', [Validators.required]],
    exservicemen: [null, [Validators.required]],
    caste: ['', [Validators.required]],
    image: [''],
    imagedata: '',
    imagedatatype: '',
    imagedataname: '',
    signature: [''],
    signaturedata: '',
    signaturetype: '',
    signaturename: '',

    permanentaddress: this.fb.group({
      houseNo: ['', [Validators.required]],
      location: ['', [Validators.required]],
      city: [null, [Validators.required]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      district: [null, [Validators.required]],
      postalCode: ['', [Validators.required]],
      countryid: '',
      stateid: '',
    }),
    currentaddress: this.fb.group({
      chouseNo: ['', [Validators.required]],
      clocation: ['', [Validators.required]],
      ccity: [null, [Validators.required]],
      ccountry: [null, [Validators.required]],
      cstate: [null, [Validators.required]],
      cdistrict: [null, [Validators.required]],
      cpostalCode: ['', [Validators.required]],
      ccountryid: '',
      cstateid: '',
    }),
    passportDetails: this.fb.group({
      isavailable: false,
      passportNumber: [{ value: '', disabled: true }, [Validators.required]],
      placeofissue: [{ value: '', disabled: true }, [Validators.required]],
      issuingauth: [{ value: '', disabled: true }, [Validators.required]],
      dateofissue: [{ value: '', disabled: true }, [Validators.required]],
      dateofexpiry: [{ value: '', disabled: true }, [Validators.required]],
      visibledismark: [{ value: '', disabled: true }, [Validators.required]],
      phouseNo: [{ value: '', disabled: true }, [Validators.required]],
      parea: [{ value: '', disabled: true }, [Validators.required]],
      pcity: [{ value: null, disabled: true }, [Validators.required]],
      pstate: [{ value: null, disabled: true }, [Validators.required]],
      pdistrict: [{ value: null, disabled: true }, [Validators.required]],
      ppostalcode: [{ value: '', disabled: true }, [Validators.required]],
      passportfile: [{ value: '', disabled: true }],
      passportfiledata: '',
      passportfiletype: '',
      passportfilename: '',
      pstateid: '',
    }),
    panAndaadhar: this.fb.group(
      {
        panNumber: [
          '',
          [
            Validators.required,
            checkPanNumberValidation(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
          ],
        ],
        confirmpanNumber: [
          '',
          [Validators.required, this.matchValidator('panNumber')],
        ],
        pancardfile: [''],
        pancardfiledata: '',
        pancardfiletype: '',
        pancardfilename: '',
        aadharNumber: ['', [Validators.required]],
        confirmaadharNumber: [
          '',
          [Validators.required, this.matchValidator('aadharNumber')],
        ],
        aadharcardfile: [''],
        aadharcardfiledata: '',
        aadharcardfiletype: '',
        aadharcardfilename: '',
      },
      {
        validator: Validators.compose([
          checkMatchValidator('panNumber', 'confirmpanNumber'),
          checkMatchValidator('aadharNumber', 'confirmaadharNumber'),
        ]),
      }
    ),
  });

  OnpancardChange(e) {
    this.personal.get('panAndaadhar.confirmpanNumber').setValue('');
  }

  OnaadharcardChange(e) {
    this.personal.get('panAndaadhar.confirmaadharNumber').setValue('');
  }

  ngOnInit(): void {
    this.getCountries();
    this.getStates2(101);
    this.personal;

    this.user = this.login.getuser();
    this.getPersonalDetails();

    this.isSameAddressControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap((isSameAddress) => {
          if (isSameAddress) {
            return this.personal.get('permanentaddress').valueChanges.pipe(
              // at the beginning fill the form with the current values
              startWith(this.personal.get('permanentaddress').value),
              tap((value) => {
                // every time the sending address changes, update the billing address
                // this.personal
                //   .get('currentaddress')
                //   .setValue(value)
                this.personal
                  .get('currentaddress.chouseNo')
                  .setValue(value.houseNo),
                  this.personal
                    .get('currentaddress.clocation')
                    .setValue(value.location),
                  this.personal
                    .get('currentaddress.ccity')
                    .setValue(value.city),
                  this.personal
                    .get('currentaddress.ccountry')
                    .setValue(value.country),
                  this.personal
                    .get('currentaddress.cstate')
                    .setValue(value.state),
                  this.personal
                    .get('currentaddress.cdistrict')
                    .setValue(value.district),
                  this.personal
                    .get('currentaddress.cpostalCode')
                    .setValue(value.postalCode),
                  this.personal
                    .get('currentaddress.ccountryid')
                    .setValue(value.countryid),
                  this.personal
                    .get('currentaddress.cstateid')
                    .setValue(value.stateid);
              })
            );
          } else {
            this.personal.get('currentaddress').reset();

            return EMPTY;
          }
        })
        // don't forget to unsubscribe when component's destroyed
      )
      .subscribe();

    this.personal
      .get('passportDetails.isavailable')
      .valueChanges.subscribe((v) => {
        if (v) {
          this.personal.get('passportDetails.passportNumber').enable();
          this.personal.get('passportDetails.placeofissue').enable();
          this.personal.get('passportDetails.issuingauth').enable();
          this.personal.get('passportDetails.dateofissue').enable();
          this.personal.get('passportDetails.dateofexpiry').enable();
          this.personal.get('passportDetails.visibledismark').enable();
          this.personal.get('passportDetails.phouseNo').enable();
          this.personal.get('passportDetails.parea').enable();
          this.personal.get('passportDetails.pcity').enable();
          this.personal.get('passportDetails.pstate').enable();
          this.personal.get('passportDetails.pdistrict').enable();
          this.personal.get('passportDetails.ppostalcode').enable();
          this.personal.get('passportDetails.passportfile').enable();
        } else {
          this.personal.get('passportDetails.passportNumber').disable();
          this.personal.get('passportDetails.placeofissue').disable();
          this.personal.get('passportDetails.issuingauth').disable();
          this.personal.get('passportDetails.dateofissue').disable();
          this.personal.get('passportDetails.dateofexpiry').disable();
          this.personal.get('passportDetails.visibledismark').disable();
          this.personal.get('passportDetails.phouseNo').disable();
          this.personal.get('passportDetails.parea').disable();
          this.personal.get('passportDetails.pcity').disable();
          this.personal.get('passportDetails.pstate').disable();
          this.personal.get('passportDetails.pdistrict').disable();
          this.personal.get('passportDetails.ppostalcode').disable();
          this.personal.get('passportDetails.passportfile').disable();
        }
      });

    this.personal.get('maritalstatus').valueChanges.subscribe((data) => {
      if (data == null || data == 'Single') {
        this.personal.get('marriagedate').disable();
      } else {
        this.personal.get('marriagedate').enable();
      }
    });
    this.getFormStatus();
  }

  getFormStatus() {
    this.formstatus.getformstate(this.user.id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.formStatusdetails = data;
          if (this.formStatusdetails.personal == '2') {
            this.personal.disable();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getCountries(): void {
    this.PersonaldetailsService.getCountries().subscribe(
      (data:country[]) => {
        this.countries = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onCountryChange(e) {
    this.personal.get('permanentaddress.countryid').setValue(e.id);
    this.personal.get('permanentaddress.state').setValue(null);
    this.personal.get('permanentaddress.city').setValue(null);
    this.personal.get('permanentaddress.district').setValue(null);

    this.getStates(e.id);
  }

  onCountryChange1(e) {
    this.personal.get('currentaddress.ccountryid').setValue(e.id);
    this.personal.get('currentaddress.cstate').setValue(null);
    this.personal.get('currentaddress.ccity').setValue(null);
    this.personal.get('currentaddress.cdistrict').setValue(null);

    this.getStates1(e.id);
  }

  public getStates(id): void {
    this.PersonaldetailsService.getStates(id).subscribe(
      (data:state[]) => {
        this.states = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getStates1(id): void {
    this.PersonaldetailsService.getStates(id).subscribe(
      (data:state[]) => {
        this.states1 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getStates2(id): void {
    this.PersonaldetailsService.getStates(id).subscribe(
      (data:state[]) => {
        this.states2 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onStateChange(e) {
    this.personal.get('permanentaddress.stateid').setValue(e.id);
    this.personal.get('permanentaddress.city').setValue(null);
    this.personal.get('permanentaddress.district').setValue(null);
    this.getCities(e.id);
    this.getDistricts(e.id);
  }
  onStateChange1(e) {
    this.personal.get('currentaddress.cstateid').setValue(e.id);
    this.personal.get('currentaddress.ccity').setValue(null);
    this.personal.get('currentaddress.cdistrict').setValue(null);
    this.getCities1(e.id);
    this.getDistricts1(e.id);
  }
  onStateChange2(e) {
    this.personal.get('passportDetails.pstateid').setValue(e.id);
    this.personal.get('passportDetails.pdistrict').setValue(null);
    this.personal.get('passportDetails.pcity').setValue(null);
    this.getCities2(e.id);
    this.getDistricts2(e.id);
  }

  public getCities(id): void {
    this.PersonaldetailsService.getCities(id).subscribe(
      (data:city[]) => {
        this.cities = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getDistricts(id): void {
    this.PersonaldetailsService.getDistricts(id).subscribe(
      (data:district[]) => {
        this.districts = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getCities1(id): void {
    this.PersonaldetailsService.getCities(id).subscribe(
      (data:city[]) => {
        this.cities1 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getDistricts1(id): void {
    this.PersonaldetailsService.getDistricts(id).subscribe(
      (data:district[]) => {
        this.districts1 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getCities2(id): void {
    this.PersonaldetailsService.getCities(id).subscribe(
      (data:city[]) => {
        this.cities2 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getDistricts2(id): void {
    this.PersonaldetailsService.getDistricts(id).subscribe(
      (data:district[]) => {
        this.districts2 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  Submit() {
    if (this.personal.get('imagedatatype').value == '') {
      this.personal.get('image').setErrors({ invalid: true });
      this.errormsg = 'Please Upload File here';
      return;
    }

    if (this.personal.get('signaturetype').value == '') {
      this.personal.get('signature').setErrors({ invalid: true });
      this.errormsg = 'Please Upload File here';
      return;
    }

    if (
      this.personal.get('passportDetails.isavailable').value == 'true' ||
      this.personal.get('passportDetails.isavailable').value == true
    ) {
      if (this.personal.get('passportDetails.passportfiletype').value == '') {
        this.personal
          .get('passportDetails.passportfile')
          .setErrors({ invalid: true });
        this.errormsg = 'Please Upload File here';
        return;
      }
    }

    if (this.personal.get('panAndaadhar.pancardfiletype').value == '') {
      this.personal
        .get('panAndaadhar.pancardfile')
        .setErrors({ invalid: true });
      this.errormsg = 'Please Upload File here';
      return;
    }
    if (this.personal.get('panAndaadhar.aadharcardfiletype').value == '') {
      this.personal
        .get('panAndaadhar.aadharcardfile')
        .setErrors({ invalid: true });
      this.errormsg = 'Please Upload File here';
      return;
    }

    if (this.personal.value.id == '') {
      this.personal.value.user['id'] = this.user.id;
      this.loader.start();
      this.PersonaldetailsService.savepersonalDetails(
        this.personal.getRawValue()
      ).subscribe(
        (data:PersonalDetails) => {
          this.loader.stop();
          // console.log('save=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Personal Details Saved',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/fdc']);
          this.formstatus.formstatusSubject.next(true);
        },
        (error) => {
          this.loader.stop();
          this.toast.error({
            detail: 'Error',
            summary: error.message,
            duration: 3000,
          });
          console.log(error);
        }
      );
    } else {
      this.loader.start();
      this.PersonaldetailsService.updatepersonalDetails(
        this.personal.getRawValue()
      ).subscribe(
        (data:PersonalDetails) => {
          this.loader.stop();
          // console.log('update=>>>>>>' + data);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Personal Details Updated',
            duration: 3000,
          });
          this.router.navigate(['user-dashboard/fdc']);
        },
        (error) => {
          this.loader.stop();
          this.toast.error({
            detail: 'Error',
            summary: error.message,
            duration: 3000,
          });
          console.log(error);
        }
      );
    }
  }

  getPersonalDetails() {
    this.PersonaldetailsService.get(this.user.id).subscribe(
      (data: PersonalDetails) => {
        this.PersonalDetails = data;

        if (this.PersonalDetails != null) {
          this.initializeForm();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initializeForm() {
    this.personal.patchValue({
      id: this.PersonalDetails.id,
      title: this.PersonalDetails.title,
      firstname: this.PersonalDetails.firstname,
      middlename: this.PersonalDetails.middlename,
      lastname: this.PersonalDetails.lastname,
      gender: this.PersonalDetails.gender,
      dob: this.PersonalDetails.dob,
      nationality: this.PersonalDetails.nationality,
      language: this.PersonalDetails.language,
      maritalstatus: this.PersonalDetails.maritalstatus,
      marriagedate: this.PersonalDetails.marriagedate,
      religion: this.PersonalDetails.religion,
      email: this.PersonalDetails.email,
      contact: this.PersonalDetails.contact,
      exservicemen: this.PersonalDetails.exservicemen,
      caste: this.PersonalDetails.caste,
      imagedatatype: this.PersonalDetails.imagedatatype,
      imagedataname: this.PersonalDetails.imagedataname,
      signaturetype: this.PersonalDetails.signaturetype,
      signaturename: this.PersonalDetails.signaturename,
      permanentaddress: {
        houseNo: this.PersonalDetails.permanentaddress.houseNo,
        location: this.PersonalDetails.permanentaddress.location,
        city: this.PersonalDetails.permanentaddress.city,
        country: this.PersonalDetails.permanentaddress.country,
        state: this.PersonalDetails.permanentaddress.state,
        district: this.PersonalDetails.permanentaddress.district,
        postalCode: this.PersonalDetails.permanentaddress.postalCode,
        countryid: this.PersonalDetails.permanentaddress.countryid,
        stateid: this.PersonalDetails.permanentaddress.stateid,
      },
      currentaddress: {
        chouseNo: this.PersonalDetails.currentaddress.chouseNo,
        clocation: this.PersonalDetails.currentaddress.clocation,
        ccity: this.PersonalDetails.currentaddress.ccity,
        ccountry: this.PersonalDetails.currentaddress.ccountry,
        cstate: this.PersonalDetails.currentaddress.cstate,
        cdistrict: this.PersonalDetails.currentaddress.cdistrict,
        cpostalCode: this.PersonalDetails.currentaddress.cpostalCode,
        ccountryid: this.PersonalDetails.currentaddress.ccountryid,
        cstateid: this.PersonalDetails.currentaddress.cstateid,
      },
      passportDetails: {
        isavailable: this.PersonalDetails.passportDetails.isavailable,
        passportNumber: this.PersonalDetails.passportDetails.passportNumber,
        placeofissue: this.PersonalDetails.passportDetails.placeofissue,
        issuingauth: this.PersonalDetails.passportDetails.issuingauth,
        dateofissue: this.PersonalDetails.passportDetails.dateofissue,
        dateofexpiry: this.PersonalDetails.passportDetails.dateofexpiry,
        visibledismark: this.PersonalDetails.passportDetails.visibledismark,
        phouseNo: this.PersonalDetails.passportDetails.phouseNo,
        parea: this.PersonalDetails.passportDetails.parea,
        pcity: this.PersonalDetails.passportDetails.pcity,
        pstate: this.PersonalDetails.passportDetails.pstate,
        pdistrict: this.PersonalDetails.passportDetails.pdistrict,
        ppostalcode: this.PersonalDetails.passportDetails.ppostalcode,
        passportfiletype: this.PersonalDetails.passportDetails.passportfiletype,
        passportfilename: this.PersonalDetails.passportDetails.passportfilename,
        pstateid: this.PersonalDetails.passportDetails.pstateid,
      },
      panAndaadhar: {
        panNumber: this.PersonalDetails.panAndaadhar.panNumber,
        confirmpanNumber: this.PersonalDetails.panAndaadhar.confirmpanNumber,
        aadharNumber: this.PersonalDetails.panAndaadhar.aadharNumber,
        confirmaadharNumber:
          this.PersonalDetails.panAndaadhar.confirmaadharNumber,
        pancardfiletype: this.PersonalDetails.panAndaadhar.pancardfiletype,
        pancardfilename: this.PersonalDetails.panAndaadhar.pancardfilename,
        aadharcardfiletype:
          this.PersonalDetails.panAndaadhar.aadharcardfiletype,
        aadharcardfilename:
          this.PersonalDetails.panAndaadhar.aadharcardfilename,
      },
      user: {
        id: this.PersonalDetails.user.id,
      },
    });

    this.getStates(this.PersonalDetails.permanentaddress.countryid);
    this.getDistricts(this.PersonalDetails.permanentaddress.stateid);
    this.getCities(this.PersonalDetails.permanentaddress.stateid);
    this.getStates1(this.PersonalDetails.currentaddress.ccountryid);
    this.getDistricts1(this.PersonalDetails.currentaddress.cstateid);
    this.getCities1(this.PersonalDetails.currentaddress.cstateid);

    if(this.PersonalDetails.passportDetails.pstateid){
      this.getCities2(this.PersonalDetails.passportDetails.pstateid);
    }
      
    if(this.PersonalDetails.passportDetails.pstateid){
      this.getDistricts2(this.PersonalDetails.passportDetails.pstateid);

    }

   
    if (this.personal.get('passportDetails.isavailable').value == false) {
      this.personal.get('passportDetails.passportNumber').disable();
      this.personal.get('passportDetails.placeofissue').disable();
      this.personal.get('passportDetails.issuingauth').disable();
      this.personal.get('passportDetails.dateofissue').disable();
      this.personal.get('passportDetails.dateofexpiry').disable();
      this.personal.get('passportDetails.visibledismark').disable();
      this.personal.get('passportDetails.phouseNo').disable();
      this.personal.get('passportDetails.parea').disable();
      this.personal.get('passportDetails.pcity').disable();
      this.personal.get('passportDetails.pstate').disable();
      this.personal.get('passportDetails.pdistrict').disable();
      this.personal.get('passportDetails.ppostalcode').disable();
      this.personal.get('passportDetails.passportfile').disable();
    } else {
      this.personal.get('passportDetails.passportNumber').enable();
      this.personal.get('passportDetails.placeofissue').enable();
      this.personal.get('passportDetails.issuingauth').enable();
      this.personal.get('passportDetails.dateofissue').enable();
      this.personal.get('passportDetails.dateofexpiry').enable();
      this.personal.get('passportDetails.visibledismark').enable();
      this.personal.get('passportDetails.phouseNo').enable();
      this.personal.get('passportDetails.parea').enable();
      this.personal.get('passportDetails.pcity').enable();
      this.personal.get('passportDetails.pstate').enable();
      this.personal.get('passportDetails.pdistrict').enable();
      this.personal.get('passportDetails.ppostalcode').enable();
      this.personal.get('passportDetails.passportfile').enable();
    }
  }

  _keyPress(event: any) {
    this.validation.allowedNumberOnly(event);
  }
  _keyPress1(event: any) {
    this.validation.allowedwordsOnly(event);
  }

  onselectFile(e) {
    if (
      e.target.files[0].type.indexOf('image') == -1 &&
      e.target.files[0].type.indexOf('pdf') == -1
    ) {
      alert('Only (jpg, png, pdf) are allowed.');
      return;
    } else if (e.target.files[0].type.indexOf('pdf') != -1) {
      this.personal.get('panAndaadhar.pancardfiletype').setValue('pdf');
    } else if (e.target.files[0].type.indexOf('image') != -1) {
      this.personal.get('panAndaadhar.pancardfiletype').setValue('image');
    }
    this.personal.get('panAndaadhar.pancardfile').setErrors(null);
    this.reader = new FileReader();
    this.reader.readAsDataURL(e.target.files[0]);

    this.reader.onload = (event: any) => {
      this.personal
        .get('panAndaadhar.pancardfiledata')
        .setValue(event.target.result);
    };
  }

  onselectFile1(e) {
    if (
      e.target.files[0].type.indexOf('image') == -1 &&
      e.target.files[0].type.indexOf('pdf') == -1
    ) {
      alert('Only (jpg, png, pdf) are allowed.');
      return;
    } else if (e.target.files[0].type.indexOf('pdf') != -1) {
      this.personal.get('panAndaadhar.aadharcardfiletype').setValue('pdf');
    } else if (e.target.files[0].type.indexOf('image') != -1) {
      this.personal.get('panAndaadhar.aadharcardfiletype').setValue('image');
    }
    this.personal.get('panAndaadhar.aadharcardfile').setErrors(null);
    this.reader = new FileReader();
    this.reader.readAsDataURL(e.target.files[0]);

    this.reader.onload = (event: any) => {
      this.personal
        .get('panAndaadhar.aadharcardfiledata')
        .setValue(event.target.result);
    };
  }

  onselectFile2(e) {
    if (
      e.target.files[0].type.indexOf('image') == -1 &&
      e.target.files[0].type.indexOf('pdf') == -1
    ) {
      alert('Only (jpg, png, pdf) are allowed.');
      return;
    } else if (e.target.files[0].type.indexOf('pdf') != -1) {
      this.personal.get('passportDetails.passportfiletype').setValue('pdf');
    } else if (e.target.files[0].type.indexOf('image') != -1) {
      this.personal.get('passportDetails.passportfiletype').setValue('image');
    }
    this.personal.get('passportDetails.passportfile').setErrors(null);
    this.reader = new FileReader();
    this.reader.readAsDataURL(e.target.files[0]);

    this.reader.onload = (event: any) => {
      this.personal
        .get('passportDetails.passportfiledata')
        .setValue(event.target.result);
    };
  }
  onselectFile3(e) {
    if (
      e.target.files[0].type.indexOf('image') == -1 &&
      e.target.files[0].type.indexOf('pdf') == -1
    ) {
      alert('Only (jpg, png, pdf) are allowed.');
      return;
    } else if (e.target.files[0].type.indexOf('pdf') != -1) {
      this.personal.get('imagedatatype').setValue('pdf');
    } else if (e.target.files[0].type.indexOf('image') != -1) {
      this.personal.get('imagedatatype').setValue('image');
    }
    this.personal.get('image').setErrors(null);
    this.reader = new FileReader();
    this.reader.readAsDataURL(e.target.files[0]);

    this.reader.onload = (event: any) => {
      this.personal.get('imagedata').setValue(event.target.result);
    };
  }
  onselectFile4(e) {
    if (
      e.target.files[0].type.indexOf('image') == -1 &&
      e.target.files[0].type.indexOf('pdf') == -1
    ) {
      alert('Only (jpg, png, pdf) are allowed.');
      return;
    } else if (e.target.files[0].type.indexOf('pdf') != -1) {
      this.personal.get('signaturetype').setValue('pdf');
    } else if (e.target.files[0].type.indexOf('image') != -1) {
      this.personal.get('signaturetype').setValue('image');
    }
    this.personal.get('signature').setErrors(null);
    this.reader = new FileReader();
    this.reader.readAsDataURL(e.target.files[0]);

    this.reader.onload = (event: any) => {
      this.personal.get('signaturedata').setValue(event.target.result);
    };
  }

  matchValidator(controlValidationName: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (
        typeof control === 'undefined' ||
        control === null ||
        typeof control.value === 'undefined' ||
        control.value === null
      ) {
        return {
          required: true,
        };
      }

      const stateName: string = control.value.trim();
      var stateName2: string;
      let isPrimaryControl: AbstractControl = null;

      const parentFormGroup: FormGroup = <FormGroup>control.parent;

      if (typeof parentFormGroup !== 'undefined' && parentFormGroup !== null) {
        isPrimaryControl = (<FormGroup>control.parent).get(
          controlValidationName
        );
        stateName2 = isPrimaryControl.value;
      } else {
        // console.log('Parent control is undefined.');
      }

      if (
        typeof isPrimaryControl === 'undefined' ||
        isPrimaryControl === null ||
        typeof isPrimaryControl.value === 'undefined' ||
        isPrimaryControl.value === null
      ) {
        return {
          invalidFlag: true,
        };
      }
      return stateName !== stateName2
        ? { matchValidator: { value: control.value } }
        : null;
    };
  }

  dateChange() {
    this.personal.get('passportDetails.dateofissue').setErrors(null);
    this.personal.get('passportDetails.dateofissue').setErrors(null);

    if (
      this.personal.get('passportDetails.dateofissue').value == null ||
      this.personal.get('passportDetails.dateofexpiry').value == null
    ) {
      return;
    }
    let issue = new Date(
      this.personal.get('passportDetails.dateofissue').value
    );
    let expiry = new Date(
      this.personal.get('passportDetails.dateofexpiry').value
    );

    if (issue >= expiry) {
      this.personal
        .get('passportDetails.dateofissue')
        .setErrors({ invalid: true });
      this.personal
        .get('passportDetails.dateofexpiry')
        .setErrors({ invalid: true });
      this.errormsg = 'Dateofexpiry should be Greater than Dateofissue';
      return;
    }
  }
}
