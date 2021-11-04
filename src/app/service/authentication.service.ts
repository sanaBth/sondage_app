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

  api_url: string = 'http://localhost:4000/apiuser';
  api_url_vote: string = 'http://localhost:4000/api/sujets';
  api_vote: string = 'http://localhost:4000/api/sujet';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
 
 

  constructor(private httpClient: HttpClient,public router: Router){}

  register(user: User){
    return this.httpClient.post(`${this.api_url}/createUser`, user);
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
    return this.httpClient.post<any>(`${this.api_url}/login`, user);
    
  }
  getVotes()
  {
    return this.httpClient.get(`${this.api_url_vote}`);
  }
  /* addVotes(vote:Vote)
  {
    return this.httpClient.post(`${this.api_vote}`,vote);
  } */
  addVotes(vote:Vote): Observable<any> {
    let url = `${this.api_vote}`;
    console.log(url);
    return this.httpClient.post(url, vote)
      .pipe(
        catchError(this.handleError)
      )
  }
  /* addVotes(vote:Vote): Promise<Vote> {
    return this.httpClient.post(this.api_vote, vote)
        .toPromise()
        .then(response => response.json())
        .catch(this.error);
}
private error(error: any) {
  let message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(message);
} */
}
