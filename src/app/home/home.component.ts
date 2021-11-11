import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  sujetsVotes:[]
  idSujet:string
  constructor(
    private _sondageservice : SondageService,private _localstorage : LocalstorageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this._sondageservice.getVotes().subscribe((data:any) => {
      this.votes = data;
      console.log(this.votes);
 
    });
   
  }
//refresh page
  refresh ()
  {
      
      this._sondageservice.getVotes().subscribe((data:any) => {
        this.votes = data; });
        console.log(this.votes);
  }
  onItemChange(event:any, i:number){
    console.log(" Value is : ", event.target.value );
    console.log(" i is : ", i );
    this.vote =  event.target.value;
 }
 //function verify in localstorage
 verifExistVote(currentId:string)
 {
  this.sujetsVotes = this._localstorage.getSujetsVotes();
  for (let i = 0;i < this.sujetsVotes.length;i++)
  {
    this.idSujet = this.sujetsVotes[i]
    if ( currentId == this.idSujet)
    {
    return true;
    }

  }
  return false;
 }
  saveResponse(id:string)
  {
    //test with function in localStorage
      /* if ( !this.verifExistVote(id) )
      { */

        if (!this._sondageservice.verifyIsvoted(this._localstorage.getUseconnected()._id,id))
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
         this.refresh();
          
          //first click
          this._localstorage.setFirstClickDate();
          //calcul number click
          if (this._localstorage.numberClick())
          {
             this.toastr.success('vous pouvez encore voter');
          }
          else
          {
            this.toastr.error('vous avez dépassez les limites de votes');
          }
          //add sujet to sujets votés
          this._sondageservice.addSujetToUser(this._localstorage.getUseconnected()._id,id).subscribe((data:any) => 
          {
          console.log(data);
        },(err) => 
          {
            console.log(err);}
          ); 
      }
      else
      {
        this.toastr.error('vous avez déja votés dans ce sujet');
      }
  }
}
