export class bank {
  public id: Number;
  public buser: buser;
  public extras: extra[];
  constructor() {
    this.id = 0;
    this.buser = new buser();
    this.extras = extra[11];
  }
}

export class extra {
  public bankname: string;
  public branchname: string;
  public bankaccountno: string;
  public confirmbankaccountno: string;
  public ifsccode: string;
  public confirmifsccode: string;
  public bankaddress: string;
  public file: string;
  public filedata: string;
  public filename: string;
  public filetype: string;
  constructor() {
    this.bankname = '';
    this.branchname = '';
    this.bankaccountno = '';
    this.confirmbankaccountno = '';
    this.ifsccode = '';
    this.confirmifsccode = '';
    this.bankaddress = '';
    this.file = '';
    this.filedata = '';
    this.filename = '';
    this.filetype = '';
  }
}

class buser {
  public id: Number;
  constructor() {
    this.id = 0;
  }
}
