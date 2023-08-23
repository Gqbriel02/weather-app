import { Component, Input, SimpleChanges } from '@angular/core';
import { catchError } from 'rxjs';
import { Weather } from 'src/app/main/_models/weather';
import { AuthService } from 'src/app/main/_services/auth.service';
import { BookmarkService } from 'src/app/main/_services/bookmark.service';
import { LoggedService } from 'src/app/main/_services/logged.service';


@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.scss']
})
export class WeatherDataComponent {
  @Input() weatherData?: Weather;
  @Input() errorMessage?: string;

  isLogged?: boolean;
  isCityInBookmarks: boolean = false;

  constructor(private logged: LoggedService,
    private bookmarkService: BookmarkService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.logged.isLogged.subscribe((data) => {
      this.isLogged = data;
      //console.log('status-login:', this.isLogged);
      if (this.weatherData) {
        //  console.log('-----:', this.weatherData.image);
      }
    });

    this.logged.isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
      if (isLogged && this.weatherData) {
        this.checkCityInBookmarks();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weatherData'] && this.isLogged && this.weatherData) {
      this.checkCityInBookmarks();
    }
  }

  private checkCityInBookmarks(): void {
    if (this.weatherData) {
      const token = this.authService.getToken();
      if (token !== null) {
        const title = this.weatherData.name;
        this.isCityInBookmarks = false;
        this.bookmarkService.getBookmarkByTitle(token, title).subscribe({
          next: () => {
            this.isCityInBookmarks = true; // If the bookmark is found
          },
          error: (error: any) => {
            // if (error.status === 404) {
            this.isCityInBookmarks = false; // If the bookmark is not found
            //  }
          }
        });
      }
    }
  }

  addBookmark() {
    if (this.isLogged && this.weatherData) {
      const token = this.authService.getToken();
      const title = this.weatherData.name;
      if (token)
        this.bookmarkService.addBookmark(token, title)
          .pipe(
            catchError(error => {
              // console.error('Error adding bookmark:', error);
              // Handle error as needed
              return [];
            })
          )
          .subscribe(bookmark => {
            //  console.log('Bookmark added:', bookmark);
            this.isCityInBookmarks = true;
            this.bookmarkService.isLoaded.next(false);
          });
    }
  }

  deleteBookmark() {
    if (this.isLogged && this.weatherData) {
      const token = this.authService.getToken();
      const title = this.weatherData.name; // Replace with a relevant title
      // console.log(title);
      if (token)
        this.bookmarkService.deleteBookmark(token, title)
          .pipe(
            catchError(error => {
              // console.error('Error deleting bookmark:', error);
              // Handle error as needed
              return [];
            })
          )
          .subscribe((bookmark) => {
            // console.log('Bookmark deleted.', bookmark);
            this.isCityInBookmarks = false;
            this.bookmarkService.isLoaded.next(false);
          });
    }
  }

}
