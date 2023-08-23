import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoggedService } from './logged.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private logged: LoggedService) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      catchError(this.handleError)
    );;
  }

  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post(`${this.apiUrl}/register`, body).pipe(
      catchError(this.handleError)
    );;
  }

  saveToken(token: string): void {
    this.logged.isLogged.next(true);
    this.logged.token.next(token);
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
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
