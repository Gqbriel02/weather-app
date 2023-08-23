import { Component, Input } from '@angular/core';
import { Bookmark } from 'src/app/main/_models/bookmark';
import { Weather } from 'src/app/main/_models/weather';
import { AuthService } from 'src/app/main/_services/auth.service';
import { BookmarkService } from 'src/app/main/_services/bookmark.service';
import { WeatherService } from 'src/app/main/_services/weather.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  @Input() userBookmarks: any[] = [];
  weatherDataMap: { [city: string]: Weather } = {}

  constructor(private bookmarkService: BookmarkService,
    private weatherService: WeatherService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    //this.loadWeatherDataForBookmarks();
    this.loadUserBookmarks();
    this.bookmarkService.isLoaded.next(false);
    this.bookmarkService.isLoaded.subscribe((isLoaded) =>{
      if(!isLoaded){
        this.loadUserBookmarks();
        this.bookmarkService.isLoaded.next(true);
      }
    })
  }

  loadUserBookmarks(): void {
    const token = this.authService.getToken();
    if (token) {
      this.bookmarkService.getAllBookmarksByAuthUser(token).subscribe((data: any[]) =>{
        this.userBookmarks = data;
      })
    }
    
  }

  showWeatherForThisCity(city: string): void{
    this.bookmarkService.showBookmark.next(city);
  }

}
