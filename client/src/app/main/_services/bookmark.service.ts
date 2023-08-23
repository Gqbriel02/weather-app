import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Weather } from '../_models/weather';
import { WeatherService } from './weather.service';
import { __values } from 'tslib';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private apiUrl = 'http://localhost:4000/api/bookmark';
  
  public isLoaded = new BehaviorSubject<boolean>(true);

  public showBookmark = new BehaviorSubject<string>("");

  constructor(private http: HttpClient, 
    private authService: AuthService,
    private weatherService: WeatherService) { }

  addBookmark(token: string, title: string): Observable<any> {
    //const token = localStorage.getItem(this.tokenKey);
    const body = { title };
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.post(`${this.apiUrl}/add-bookmark`, { title }, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteBookmark(token: string, title: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.delete(`${this.apiUrl}/delete-bookmark/${title}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getBookmarkByTitle(token: string, title: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.get<any>(`${this.apiUrl}/get-bookmark/${title}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAllBookmarksByAuthUser(token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': token
      });
      return this.http.get<any>(`${this.apiUrl}/show-all-bookmarks`, { headers }).pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: any): Observable<never> {
    return throwError(() => new Error('An error occurred.'));
  }
}
