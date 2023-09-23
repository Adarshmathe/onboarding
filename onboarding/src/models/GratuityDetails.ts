export class gratuityDetails{
   public id:Number;
   public guser:guser;
   public name3: string;
   public name: string;
   public name1: Date;
   public r1c1: string;
   public r1c2: string;
   public r1c3: string;
   public r1c4: string;
   public r2c1: string;
   public r2c2: string;
   public r2c3: string;
   public r2c4: string;
   public r3c1: string;
   public r3c2: string;
   public r3c3: string;
   public r3c4: string;
   public nameofemployee: string;
   public sex:string;
   public religion:string;
   public ismarried:string;
   public department:string;
   public ticket:string;
   public date:Date;
   public village:string;
   public thana:string;
   public subdivision:string;
   public postoffice:string;
   public district:string;
   public state:string;
   public date1:Date;
   public place1:string;
   public witness1:string;
   public witness2:string;
   public date2:Date;
   public place2:string;
   public date3:Date;
   public date4:Date;

   constructor(){
    this.id = 0;
    this.guser = new guser();
    this.name3 = '';
    this.name = '';
    this.name1 = null;
    this.r1c1 = '';
    this.r1c2 = '';
    this.r1c3 = '';
    this.r1c4 = '';
    this.r2c1 = '';
    this.r2c2 = '';
    this.r2c3 = '';
    this.r2c4 = '';
    this.r3c1 = '';
    this.r3c2 = '';
    this.r3c3 = '';
    this.r3c4 = '';
    this.nameofemployee = '';
    this.sex = '';
    this.religion = '';
    this.ismarried = '';
    this.department = '';
    this.ticket = '';
    this.date = null;
    this.village = '';
    this.thana = '';
    this.subdivision = '';
    this.postoffice = '';
    this.district = '';
    this.state = '';
    this.date1 = null;
    this.place1 = '';
    this.witness1 = '';
    this.witness2 = '';
    this.date2 = null;
    this.place2 = '';
    this.date3 =null;
    this.date4 = null;
   }
} 

class guser {
    public id: Number;
    constructor() {
      this.id = 0;
    }
  }