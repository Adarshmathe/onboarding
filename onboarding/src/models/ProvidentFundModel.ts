export class ProvidentFund{

   public id   : Number;
   public pfuser: pfUser;
   public name : string;
   public checkboxname: string;
   public checkboxvalue: string;
   public dob : Date;
   public gender : string;
   public maritalstatus : string;
   public emailid : string;
   public mobile : string;
   public providentfundscheme: string;
   public pensionscheme: string;
   public uan: string;
   public previouspfno: string;
   public dateofexit: Date;
   public schemecertno: string;
   public ppo: string;
   public internationalworker: string;
   public country: string;
   public passportno : string;
   public validity : string;
   public bankaccountandifsc : string;
   public aadharcard: string;
   public panno : string;
   public empcode: string;
   public company: string;
   public date : Date;
   public place: string;
   public date1 : Date;
   public name1: string;
   public date3: Date;
   public pfno: string
   public uan1: string;
   public checkbox1: string
   public checkbox2: string;

constructor() {


    this.id   = 0;
    this.pfuser= new pfUser();
    this.name = "";
    this.checkboxname= "";
    this.checkboxvalue= "";
    this.dob = null;
    this.gender = "";
    this.maritalstatus = "";
    this.emailid = "";
    this.mobile ="";
    this.providentfundscheme= "";
    this.pensionscheme= "";
    this.uan="";
    this.previouspfno= "";
    this.dateofexit= null;
    this.schemecertno= "";
    this.ppo= "";
    this.internationalworker= "";
    this.country= "";
    this.passportno = "";
    this.validity = "";
    this.bankaccountandifsc = "";
    this.aadharcard="";
    this.panno = "";
    this.empcode= "";
    this.company= "";
    this.date = null;
    this.place= "";
    this.date1 =null;
    this.name1= "";
    this.date3= null;
    this.pfno= "";
    this.uan1= "";
    this.checkbox1= "";
    this.checkbox2= "";
}
}



export class pfUser {
    public id: Number;
    constructor() {
      this.id = 0;
    }
  }