
export class formstatus {
  public id: number;
  public personal: string;
  public family: string;
  public education: string;
  public experience: string;
  public bank: string;
  public provident: string;
  public gratuity: string;
  public employeeConfidentialityAgreement: string;
  public groupMediclaim: string;
  public groupTermInsurance: string;
  public nominationinPF: string;
  public codeOfConduct: string;
  public formuser: formuser;
  constructor() {
    this.id = 0;
    this.personal = '';
    this.family = '';
    this.education = '';
    this.experience = '';
    this.bank = '';
    this.gratuity = '';
    this.employeeConfidentialityAgreement = '';
    this.groupMediclaim = '';
    this.groupTermInsurance = '';
    this.provident = '';
    this.nominationinPF = '';
    this.codeOfConduct = '';
    this.formuser = new formuser();
  }
}

class formuser {
  public id: Number;
  constructor() {
    this.id = 0;
  }
}
