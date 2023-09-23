export class country{
    public id:Number;
	public sortname:string;
	public name: string;
    constructor(){
        this.id =0;
        this.sortname = '';
        this.name = '';
    }
}

export class state{
    public id:Number;
	public name:string;
	public country: country;
    constructor(){
        this.id =0;
        this.name = '';
        this.country = new country();
    }
}

export class district{
    public id:Number;
	public name: string;
    public dstate:state;
    constructor(){
        this.id =0;
        this.name = '';
        this.dstate = new state();
    }
}
export class city{
    public id:Number;
	public name: string;
    public state:state;
    constructor(){
        this.id =0;
        this.name = '';
        this.state = new state();
    }
}