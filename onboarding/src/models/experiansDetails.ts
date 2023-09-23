export class experience {
  id: Number;
  euser: euser;
  extras: extra[];
  constructor() {
    this.id = 0;
    this.euser = new euser();
    this.extras = [];
  }
}

export class extra {
  public fromDate: Date;
  public toDate: Date;
  public employer: string;
  public place: string;
  public industry: string;
  public designation: string;
  public experience: Number;
  constructor() {
    this.fromDate = new Date();
    this.toDate = new Date();
    this.employer = '';
    this.place = '';
    this.industry = '';
    this.designation = '';
    this.experience = 0;
  }
}

class euser {
  public id: Number;
  constructor() {
    this.id = 0;
  }
}
