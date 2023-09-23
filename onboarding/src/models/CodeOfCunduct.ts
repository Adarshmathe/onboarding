export class code0fconduct{
    id:Number;
    cocuser:cocuser;
    checkbox: boolean;
    constructor(){
        this.id = 0;
        this.cocuser = new cocuser();
        this.checkbox = false;
    }
}

class cocuser {
    public id: Number;
    constructor() {
      this.id = 0;
    }
  }