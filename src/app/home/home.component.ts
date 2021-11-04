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
  vote:string;
  
  constructor(
    private _sondageservice : SondageService) { }

  ngOnInit(): void {
    this._sondageservice.getVotes().subscribe((data:any) => {
      this.votes = data;
      console.log(this.votes);
    });
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
      )

    }
    else
    {
      this._sondageservice.voterNon(id);
    }
  }

}
