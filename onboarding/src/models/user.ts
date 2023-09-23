export interface user{
    id:Number;
    name:string;
    password:string;
    email:string;
    mobile:number;
    role:string;
    enabled:boolean;
    createdOn: Date;
    image:string;
}

export interface Role{
    id:Number;
    name:string;
}