export class mediclaimDetails{
   public id:Number;
   public muser:muser;
   public name: string;
   public management: string;
   public email: string;
   public address: string;
   public mobile: string;
   public erp: string;
   public doj: Date;
   public dept: string;
   public designation: string;
   public alternateno: string;
   public r1c2: string;
   public r1c3:Date;
   public r1c4: string;
   public r1c5: string;
   public r1c6: string;
   public r2c2: string;
   public r2c3: Date;
   public r2c4: string;
   public r2c5: string;
   public r2c6: string;
   public r3c2: string;
   public r3c3: Date;
   public r3c4: string;
   public r3c5: string;
   public r3c6: string;
   public r4c2: string;
   public r4c3: Date;
   public r4c4: string;
   public r4c5: string;
   public r4c6: string;
   public r5c2: string;
   public r5c3: Date;
   public r5c4: string;
   public r5c5: string;
   public r5c6: string;
   public r6c2: string;
   public r6c3: Date;
   public r6c4: string;
   public r6c5: string;
   public r6c6: string;
   public place: string;
   public date:Date;
   constructor(){
    this.id =0;
    this.muser = new muser();
    this.name = '';
    this.management = '';
    this.email = '';
    this.address = '';
    this.mobile = '';
    this.erp = '';
    this.doj = null;
    this.dept = '';
    this.designation = '';
    this.alternateno = '';
    this.r1c2 = '';
    this.r1c3 = null;
    this.r1c4 = '';
    this.r1c5 = '';
    this.r1c6 = '';
    this.r2c2 = '';
    this.r2c3 = null;
    this.r2c4 = '';
    this.r2c5 = '';
    this.r2c6 = '';
    this.r3c2 = '';
    this.r3c3 = null;
    this.r3c4 = '';
    this.r3c5 = '';
    this.r3c6 = '';
    this.r4c2 = '';
    this.r4c3 = null;
    this.r4c4 = '';
    this.r4c5 = '';
    this.r4c6 = '';
    this.r5c2 = '';
    this.r5c3 = null;
    this.r5c4 = '';
    this.r5c5 = '';
    this.r5c6 = '';
    this.r6c2 = '';
    this.r6c3 = null;
    this.r6c4 = '';
    this.r6c5 = '';
    this.r6c6 = '';
    this.place = '';
    this.date = null;
   }
}

class muser {
    public id: Number;
    constructor() {
      this.id = 0;
    }
  }