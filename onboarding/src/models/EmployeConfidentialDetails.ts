export class employeeconfidentialDetails{
   public id: Number;
   public ecauser: ecauser;
   public name: Date;
   public title1: string;
   public empno: string;
   public name4: string;
   public age: string;
   public resident: string;
   public name1: string;
   public office: string;
   public joiningdate: Date;
   public appointmentdate: Date;
   public name2: string;
   public employee: string;
   public witness: string;
   public name3: string;
   public title: string;
   constructor(){
    this.id = 0;
    this.ecauser = new ecauser();
    this.name = null;
    this.title1 = "";
    this.empno = "";
    this.name4 = "";
    this.age = "";
    this.resident = "";
    this.name1 = "";
    this.office = "";
    this.joiningdate = null;
    this.appointmentdate =null;
    this.name2 = "";
    this.employee = "";
    this.witness = "";
    this.name3 = "";
    this.title = "";
   }
}

class ecauser {
    public id: Number;
    constructor() {
      this.id = 0;
    }
  }