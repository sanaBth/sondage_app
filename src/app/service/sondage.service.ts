
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Vote } from '../models/vote';
@Injectable({
  providedIn: 'root'
})
export class SondageService {
  api_url: string = 'http://localhost:4000';
  
  constructor(private httpClient: HttpClient) { }

  getVotes()
  {
    return this.httpClient.get(`${this.api_url}/apisujet/sujets`);
  }

  addVotes(vote:Vote,id:any): Observable<any> {
    let url = `${this.api_url}/apisujet/sujet/${id}`;
    console.log(url);
    return this.httpClient.post(url, vote)
      .pipe(
        catchError(this.handleError)
      )
  }
/*   getSujetsVotes()
  {
    let user = this.getUseconnected(); 
    let sujetVotes = user.sujetsVotes;

    return sujetVotes;
  } */
  voterOui(_id:string)
  {
    let url = `${this.api_url}/apisujet/sujet/voteoui/${_id}`;
    return this.httpClient.put(url,null)
      .pipe(
        catchError(this.handleError)
      )
  }
  //add sujet votés to user
  addSujetToUser(_idu:string,_ids:string)
  {
    let url = `${this.api_url}/apiuser/user/${_idu}/${_ids}`;

    return this.httpClient.put(url,null)
      .pipe(
        catchError(this.handleError)
      )
  }
  //get Sujets votés from user
  verifyIsvoted(_idu:string,_ids:string)
  {
    let url = `${this.api_url}/apiuser/user/${_idu}/${_ids}`;

    return this.httpClient.get(url);
      
  }
  voterNon(_id:string)
  {
    let url = `${this.api_url}/apisujet/sujet/votenon/${_id}`;
    return this.httpClient.put(url,null)
      .pipe(
        catchError(this.handleError)
      )
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
}
