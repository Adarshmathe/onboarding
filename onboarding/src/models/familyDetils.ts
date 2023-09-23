export class family {
  id: Number;
  fuser: fuser;
  extras: extra[];
  constructor() {
    this.id = 0;
    this.fuser = new fuser();
    this.extras = [];
  }
}

export class extra {
  public lastname: string;
  public firstname: string;
  public relation: string;
  public dob: Date;
  public gender: string;
  constructor() {
    this.lastname = '';
    this.firstname = '';
    this.relation = '';
    this.dob = new Date();
    this.gender = '';
  }
}

class fuser {
  public id: Number;
  constructor() {
    this.id = 0;
  }
}
