import { Component, EventEmitter, Output } from '@angular/core';
import { BookmarkService } from 'src/app/main/_services/bookmark.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();
  city: string = '';

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
    this.bookmarkService.showBookmark.subscribe((weatherTitle) => {
      if (weatherTitle != "")
        this.city = weatherTitle;
    })
  }

  search() {
    this.searchEvent.emit(this.city);
  }
}
