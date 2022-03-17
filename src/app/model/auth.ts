import { ThrowStmt } from "@angular/compiler";
import { Role } from "./role";

export class Auth {



    id:string="";
    password:string="";
    active:boolean=false;
    roles:Role[]=[];
    loggedInTS!:Date;

    constructor(_userid:string,_password:string){
        this.id = _userid;
        this.password = _password;
    }
}

export const auths:Auth[] = [
    {
        id: "rajk",
        password: "rajk123",
        active: true,
        loggedInTS: new Date(),
        roles:[
            {id:1,name:"admin"},
            {id:2,name:"vol"}
        ]
    },
    {
        id: "kala",
        password: "kala123",
        active: true,
        loggedInTS: new Date(),
        roles:[
            {id:2,name:"vol"}
        ]
    }
]