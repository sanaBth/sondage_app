import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { Vote } from '../models/vote';





@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  api_url: string = 'http://localhost:4000';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
 
 

  constructor(private httpClient: HttpClient,public router: Router){}

  register(user: User){
    return this.httpClient.post(`${this.api_url}/apiuser/createUser`, user);
  }
 
  getAccessToken() {
    return localStorage.getItem('access_token');
  }
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
  // Sign-in
  login(user: User) {
    return this.httpClient.post<any>(`${this.api_url}/apiuser/login`, user);
    
  }
 /*  getProfile(user: User)
  {
    return this.httpClient.get<any>(`${this.api_url}/apiuser/profile`, user);
  } */
  /* addVotes(vote:Vote)
  {
    return this.httpClient.post(`${this.api_vote}`,vote);
  } */
  
 
}
