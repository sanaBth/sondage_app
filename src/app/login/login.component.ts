import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm:FormGroup;
  constructor(private _authService:  AuthenticationService,private router: Router
  ) { }
  currentUser : User ;
  public users : User[] ;

  ngOnInit(): void {
    this.userForm = new FormGroup
    ({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })
  }
  public login()
  {
   
      this._authService.login(this.userForm.value)
      this.router.navigate(['/home']);

  }
}
