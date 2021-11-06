import { Component, OnInit } from '@angular/core';
import { Vote } from '../models/vote';
import { AuthenticationService } from '../service/authentication.service';
import { SondageService } from '../service/sondage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  votes: Vote[];
  public sujets: Vote[];
 
  vote:string;
  pourcentNon :any = 0;
  responseOui : any
  responseNon : any
  pourcentOui:any = 0;
  constructor(
    private _sondageservice : SondageService) { }

  ngOnInit(): void {
    this._sondageservice.getVotes().subscribe((data:any) => {
      this.votes = data;
      console.log(this.votes);
    this.votes.forEach(element => {
      this.responseOui = element.oui;
      this.responseNon = element.non;
      this.pourcentOui = ((this.responseOui* 100 ) / (this.responseOui+ this.responseNon));
      element.pourcentoui=this.pourcentOui;
      this.pourcentNon = ((this.responseNon* 100 ) / (this.responseOui+ this.responseNon));
      element.pourcentnon=this.pourcentNon;
    console.log(this.pourcentOui);
        console.log(this.pourcentNon);
    });
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
          //this.router.navigate(['/home']);
        },
        (err)=>{console.log(err.error.msg);
        //notification error
      
      }
      );
      this._sondageservice.getVotes().subscribe((data:any) => {
        this.votes = data; });
      
    }
    else
    {
      this._sondageservice.voterNon(id).subscribe(
        (res)=>{console.log(res);
          //this.router.navigate(['/home']);
        },
        (err)=>{console.log(err.error.msg);
        //notification error
      
      }
      );
      this._sondageservice.getVotes().subscribe((data:any) => {
        this.votes = data; });
    }
  }


}
