import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vote } from '../models/vote';
import { LocalstorageService } from '../service/localstorage.service';
import { SondageService } from '../service/sondage.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent implements OnInit {

  constructor(
    private _sondageservice : SondageService,private _localstorage : LocalstorageService) { }
  postForm : FormGroup;
  currentPost : Vote;
  ngOnInit(): void {
    this.postForm = new FormGroup
    ({
      titre: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      choix : new FormControl('',Validators.required),
      
    })
  }
  savePost()
  {
   let userConn = this._localstorage.getUseconnected();
    console.log(this.postForm.value);
    this._sondageservice.addVotes(this.postForm.value,userConn._id).subscribe(
      (res)=>{console.log(res);
        //this.router.navigate(['/home']);
      },
      (err)=>{console.log(err);
      //notification error
    
    }
    );
  }

}
