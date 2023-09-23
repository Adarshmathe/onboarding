export class education {
  public id: Number;
  public eduuser: eduuser;
  public extras: extra[];
  constructor() {
    this.id = 0;
    this.eduuser = new eduuser();
    this.extras = [];
  }
}

export class extra {
  public course: string;
  public branch: string;
  public school_Institute: string;
  public board_university: string;
  public fromDate: Date;
  public toDate: Date;
  public noOfYears: string;
  public cgpa: Number;
  public file: string;
  public filedata: string;
  public filename: string;
  public filetype: string;
  constructor() {
    this.course = '';
    this.branch = '';
    this.school_Institute = '';
    this.board_university = '';
    this.fromDate = new Date();
    this.toDate = new Date();
    this.noOfYears = '';
    this.cgpa = 0;
    this.file = '';
    this.filedata = '';
    this.filename = '';
    this.filetype = '';
  }
}

class eduuser {
  public id: Number;
  constructor() {
    this.id = 0;
  }
}
