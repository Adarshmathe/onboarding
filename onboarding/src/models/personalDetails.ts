export class PersonalDetails {
  public id: Number;
  public title: string;
  public firstname: string;
  public middlename: string;
  public lastname: string;
  public gender: string;
  public dob: Date;
  public nationality: string;
  public language: string;
  public maritalstatus: string;
  public marriagedate: Date;
  public religion: string;
  public email: string;
  public contact: string;
  public exservicemen: string;
  public caste: string;
  public image: string;
  public imagedata: string;
  public imagedatatype: string;
  public imagedataname: string;
  public signature: string;
  public signaturedata: string;
  public signaturetype: string;
  public signaturename: string;
  public permanentaddress: permanentaddress;
  public currentaddress: currentaddress;
  public passportDetails: passportDetails;
  public panAndaadhar: panAndaadhar;
  public user: user;

  constructor() {
    this.id = 0;
    this.title = '';
    this.firstname = '';
    this.middlename = '';
    this.lastname = '';
    this.gender = '';
    this.dob = null;
    this.nationality = '';
    this.language = '';
    this.maritalstatus = '';
    this.marriagedate =null;
    this.religion = '';
    this.email = '';
    this.contact = '';
    this.exservicemen = '';
    this.caste = '';
    this.image = '';
    this.imagedata = '';
    this.imagedatatype = '';
    this.imagedataname = '';
    this.signature = '';
    this.signaturedata = '';
    this.signaturetype = '';
    this.signaturename = '';

    this.permanentaddress = new permanentaddress();
    this.currentaddress = new currentaddress();
    this.passportDetails = new passportDetails();
    this.panAndaadhar = new panAndaadhar();
    this.user = new user();
  }
}

class permanentaddress {
  public houseNo: string;
  public location: string;
  public city: string;
  public country: string;
  public state: string;
  public district: string;
  public postalCode: string;
  public countryid: Number;
  public stateid: Number;
  constructor() {
    this.houseNo = '';
    this.location = '';
    this.city = '';
    this.country = '';
    this.state = '';
    this.district = '';
    this.postalCode = '';
    this.countryid = 0;
    this.stateid = 0;
  }
}

class currentaddress {
  public chouseNo: string;
  public clocation: string;
  public ccity: string;
  public ccountry: string;
  public cstate: string;
  public cdistrict: string;
  public cpostalCode: string;
  public ccountryid: Number;
  public cstateid: Number;
  constructor() {
    this.chouseNo = '';
    this.clocation = '';
    this.ccity = '';
    this.ccountry = '';
    this.cstate = '';
    this.cdistrict = '';
    this.cpostalCode = '';
    this.ccountryid = 0;
    this.cstateid = 0;
  }
}

class passportDetails {
  public isavailable: boolean;
  public passportNumber: string;
  public placeofissue: string;
  public issuingauth: string;
  public dateofissue: Date;
  public dateofexpiry: Date;
  public visibledismark: string;
  public phouseNo: string;
  public parea: string;
  public pcity: string;
  public pstate: string;
  public pdistrict: string;
  public ppostalcode: string;
  public passportfile: string;
  public passportfiledata: string;
  public passportfiletype: string;
  public passportfilename: string;
  public pstateid: Number;
  constructor() {
    this.isavailable = false;
    this.passportNumber = '';
    this.placeofissue = '';
    this.issuingauth = '';
    this.dateofissue =null;
    this.dateofexpiry = null;
    this.visibledismark = '';
    this.phouseNo = '';
    this.parea = '';
    this.pcity = '';
    this.pstate = '';
    this.pdistrict = '';
    this.ppostalcode = '';
    this.passportfile = '';
    this.passportfiledata = '';
    this.passportfiletype = '';
    this.passportfilename = '';
    this.pstateid = 0;
  }
}

class panAndaadhar {
  public panNumber: string;
  public confirmpanNumber: string;
  public pancardfile: string;
  public pancardfiledata: string;
  public pancardfiletype: string;
  public pancardfilename: string;
  public aadharNumber: string;
  public confirmaadharNumber: string;
  public aadharcardfile: string;
  public aadharcardfiledata: string;
  public aadharcardfiletype: string;
  public aadharcardfilename: string;
  constructor() {
    this.panNumber = '';
    this.confirmpanNumber = '';
    this.pancardfile = '';
    this.pancardfiledata = '';
    this.pancardfiletype = '';
    this.pancardfilename = '';
    this.aadharNumber = '';
    this.confirmaadharNumber = '';
    this.aadharcardfile = '';
    this.aadharcardfiledata = '';
    this.aadharcardfiletype = '';
    this.aadharcardfilename = '';
  }
}

class user {
  public id: Number;
  constructor() {
    this.id = 0;
  }
}
