import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {
  static getImages() {
    throw new Error('Method not implemented.');
  }
  private apiKey = 'HmTq6J-DYJTiQaU75Nb44uOi0anKzTtceK_nGBzu9ig';
  private baseUrl = 'https://api.unsplash.com/search/photos';
  
  constructor(private http: HttpClient) { }

  getImages(query: string): Observable<any> {
    const url = `${this.baseUrl}?query=${query}&client_id=${this.apiKey}`;
    return this.http.get(url).pipe(
      catchError(error => {
        // Handle the image service error if necessary
        console.error('Error fetching image:', error);
        return [];
      }),
      map((response: any) => {
        if(response.results && response.results.length > 0) {
          //console.log(response);
          return response.results[0].urls.regular;
        } else {
          throw new Error('Image not found in response.');
        }
      })
    );
  }
}
   