import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedService } from './logged.service';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api/logged';
  private tokenKey = 'authToken';

  public userSubject = new BehaviorSubject<User | null>(null);
  private token = localStorage.getItem(this.tokenKey);

  constructor(private http: HttpClient, private logged: LoggedService) {
    this.logged.isLogged.subscribe((userIsLogged) => {
      if (userIsLogged && this.token) {
        this.getAuthUser(this.token).subscribe((user) => {
          this.userSubject.next(user);
        })
      }
    })
  }

  getAuthUser(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get(`${this.apiUrl}/get-auth-user`, { headers }).pipe(
      catchError(this.handleError)
    );

  }


  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred.';

    if (error.status === 404) {
      errorMessage = 'Api Error.';
    } else if (error.status === 0) {
      errorMessage = 'Connection error. Please check your internet connection.';
    }
    return throwError(() => new Error(errorMessage));
  }

}
