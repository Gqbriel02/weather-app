import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { Weather } from '../_models/weather';
import { GetImageService } from './get-image.service';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '99dab4aa59c282f606ada3fa69e8f816';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient, private getImageService: GetImageService) { }

  getWeather(city: string): Observable<Weather> {
    const url = `${this.baseUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    //console.warn(url);
    return this.http.get<Weather>(url).pipe(
      switchMap(weather => {
        return this.getImageService.getImages(city).pipe(
          catchError(error => {
            console.error('Error fetching image:', error);
            return [];
          }),
          switchMap((image: string) => {
            weather.image = image;
            return [weather];
          })
        );
      }),
      catchError(this.handleError)
    ); // Specify the return type as Weather
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred.';

    if (error.status === 404) {
      errorMessage = 'City not found.';
    } else if (error.status === 0) {
      errorMessage = 'Connection error. Please check your internet connection.';
    }

    return throwError(() => new Error(errorMessage));
  }

}
