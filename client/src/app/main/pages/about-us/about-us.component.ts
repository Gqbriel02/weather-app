import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  @ViewChild('subscribeSection') subscribeSection!: ElementRef;
  constructor(private renderer: Renderer2) {}

  scrollToSubscribe() {
    const subscribeSection = this.subscribeSection.nativeElement;
  
    if (subscribeSection) {
      window.scrollTo({
        top: subscribeSection.offsetTop,
        behavior: 'smooth' 
      });
    }
  }
}
