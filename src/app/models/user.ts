import { Vote } from "./vote";

export class User {
    username:string;
    email:string;
    password:string;
  sujetsVotes :Vote[]
  
    constructor(username :string,email : string,password:string, sujetsVotes :[])
    {
        this.username=username;
        this.email=email;
        this.password=password;
        this.sujetsVotes=sujetsVotes;
    }
}