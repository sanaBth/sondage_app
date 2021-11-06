import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  public users : User[] = [ ]
  constructor( private toastr: ToastrService) { }
  
  
  setUseconnected(user :any)
  {
    localStorage.setItem('userconnected', JSON.stringify(user));  
  }
  getUseconnected()
  {
    return JSON.parse(localStorage.getItem('userconnected') || 'null');  
  }
  
  public logout()
  {
     localStorage.removeItem('userconnected')

  }
  getFirstClickDate():Date
  {
   return JSON.parse(localStorage.getItem('firstClickDate') || 'null');
  }
  getCompteurClick()
  {
   return JSON.parse(localStorage.getItem('compteurClick') || '0');
   
  }


  public setFirstClickDate()
  {
    let dateClick = this.getFirstClickDate();
    if (dateClick == null)
    {
      dateClick = new Date();
      localStorage.setItem('firstClickDate',JSON.stringify(dateClick));
    }
  }
  public numberClick( )
  {
    let compteur =this.getCompteurClick();
    let dateNow = new Date();
    let dateClick = this.getFirstClickDate();
    console.log(dateClick);
    let date = new Date(dateClick)
    console.log(date);
    var hours = Math.abs(date.getTime() - dateNow.getTime()) / 36e5;
    console.log(hours);
    if ((compteur < 5) && (hours < 24 ) )
    {
       compteur +=1;
       localStorage.setItem('compteurClick',JSON.stringify(compteur));
       console.log(hours);
       return true;
    }
    else
    {
      console.log("vous avez depassé le limites de votes");
      return false;
    }
  
  }

}
