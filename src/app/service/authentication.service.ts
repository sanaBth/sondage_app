import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';





@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  api_url: string = 'http://localhost:4000/apiuser';
  api_url_vote: string = 'http://localhost:4000/api/sujets';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
 
 

  constructor(private httpClient: HttpClient,public router: Router){}

  register(user: User){
    return this.httpClient.post(`${this.api_url}/createUser`, user);
  }
 /*  register(user: User): Observable<any> {
    let api = `${this.api_url}/createUser`;
    return this.httpClient.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  } */
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
      /* .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
         this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.msg._id]);
        }) 
      }) */
  }
  getVotes()
  {
    return this.httpClient.get(`${this.api_url_vote}`);
  }

  /*   // User profile
    getUserProfile(id:int): Observable<any> {
      let api = `${this.this.api_url}/user-profile/${id}`;
      return this.http.get(api, { headers: this.headers }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
    } */
 /*  login(user: User) {
    return this.httpClient.post<any>(`${this.API_URL}/users/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['users/profile/' + res.msg._id]);
        })
      })
  }

  

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['users/login']);
    }
  }

  getUserProfile(id): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/profile/${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

   */
}
