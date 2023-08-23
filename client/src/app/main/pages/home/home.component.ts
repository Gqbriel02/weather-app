import { Component } from '@angular/core';
import { WeatherService } from '../../_services/weather.service';
import { Weather } from '../../_models/weather';
import { BookmarkService } from '../../_services/bookmark.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  weatherData?: Weather;
  errorMessage?: string;
  constructor(private weatherService: WeatherService, private bookmarkService: BookmarkService) { }


  ngOnInit(): void {
    this.bookmarkService.showBookmark.subscribe((weatherTitle) =>{
      if(weatherTitle != "")
        this.searchWeather(weatherTitle);
    })
  }

  searchWeather(city: string) {
    this.weatherService.getWeather(city)
      .subscribe(
        {
          next: (data) => {
            this.weatherData = data;
           // console.error('err---', data);
          },
          error: (error) => {
            // Handle the error here, e.g., show an error message to the user
            //console.error(error);
            this.errorMessage = error;
          }
        }
        );
  }
}
