import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  private tokenKey = 'authToken';

  public isLogged = new BehaviorSubject<boolean>(false);
  public token = new BehaviorSubject<string>('');

  constructor() { 
    let token = localStorage.getItem(this.tokenKey);
    if(token){
      this.isLogged.next(true);
      this.token.next(token);
    } 
  }
}
