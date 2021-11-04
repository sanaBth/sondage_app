
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
  api_url_vote: string = 'http://localhost:4000/apisujet/sujets';
  api_vote: string = 'http://localhost:4000/apisujet/sujet';

  constructor(private httpClient: HttpClient) { }

  getVotes()
  {
    return this.httpClient.get(`${this.api_url_vote}`);
  }

  addVotes(vote:Vote): Observable<any> {
    let url = `${this.api_vote}`;
    console.log(url);
    return this.httpClient.post(url, vote)
      .pipe(
        catchError(this.handleError)
      )
  }

  voterOui(_id:string)
  {
    let url = `${this.api_vote}/voteoui/${_id}`;
    return this.httpClient.put(url,null)
      .pipe(
        catchError(this.handleError)
      )
  }

  voterNon(_id:string)
  {
    let url = `${this.api_vote}/votenon/${_id}`;
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
