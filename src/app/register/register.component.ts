import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';

import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public users = [];
  public errorMsg : String;
  constructor(private _authService:AuthenticationService,private router: Router) { }
  userForm:FormGroup;
  currentUser : User ;
  ngOnInit(): void {
    this.userForm = new FormGroup
    ({
      fname : new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      pwd: new FormControl('',Validators.required),
    })
    
  }
 /*  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset()
        this.router.navigate(['log-in']);
      }
    })
  } */
  public saveUser()
  { 
  userForm:FormGroup;
   this._authService.register(this.userForm.value).subscribe((res) => {
    if (res) {
   //  this.signupForm.reset()
      this.router.navigate(['']);
    }
  })
  }
  
}
