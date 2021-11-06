import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { Vote } from '../models/vote';
import { AuthenticationService } from '../service/authentication.service';
import { LocalstorageService } from '../service/localstorage.service';
import { SondageService } from '../service/sondage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  votes: Vote[];
  public sujets: Vote[];
 users:User[]
  vote:string;
  pourcentNon :any = 0;
  responseOui : any
  responseNon : any
  pourcentOui:any = 0;
  constructor(
    private _sondageservice : SondageService,private _localstorage : LocalstorageService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this._sondageservice.getVotes().subscribe((data:any) => {
      this.votes = data;
      console.log(this.votes);
 
    });
   
  }
  refresh ()
  {
    return this._sondageservice.getVotes();
  }
  onItemChange(event:any, i:number){
    console.log(" Value is : ", event.target.value );
    console.log(" i is : ", i );
    this.vote =  event.target.value;
 }
  saveResponse(id:string)
  {
    
    console.log(id,this.vote);
    if(this.vote == 'oui')
    {
      this._sondageservice.voterOui(id).subscribe(
        (res)=>{console.log(res);
        },
        (err)=>{console.log(err.error.msg);
        //notification error
      }
      );
    }
    else
    {
      this._sondageservice.voterNon(id).subscribe(
        (res)=>{console.log(res);
        },
        (err)=>{console.log(err.error.msg);
        //notification error
      }
      );
    }
    //refresh page
    this._sondageservice.getVotes().subscribe((data:any) => {
        this.votes = data; });
        console.log(this.votes);
    //first click
    this._localstorage.setFirstClickDate();
    //calcul number click
    if (this._localstorage.numberClick())
    {
     this.toastr.success('vous pouvez encore voter');
    }else
    {
      this.toastr.error('vous avez dépassez les limites de votes');
    }
    //add sujet to sujets votés
    this._sondageservice.addSujetToUser(this._localstorage.getUseconnected()._id,id).subscribe((data:any) => 
    {
     console.log(data);},(err) => 
     {
      console.log(err);}
     );
  }
}
