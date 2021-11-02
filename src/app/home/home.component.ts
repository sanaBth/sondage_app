import { Component, OnInit } from '@angular/core';
import { Vote } from '../models/vote';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  votes: Vote[];
  constructor(private _authservice: AuthenticationService) { }

  ngOnInit(): void {
    this._authservice.getVotes().subscribe((data:any) => {
      this.votes = data;
      console.log(this.votes);
    });
  }

}
