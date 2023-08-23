import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './main/components/layout/navbar/navbar.component';
import { FooterComponent } from './main/components/layout/footer/footer.component';
import { SidebarComponent } from './main/components/layout/sidebar/sidebar.component';
import { HomeComponent } from './main/pages/home/home.component';
import { MyAccountComponent } from './main/pages/my-account/my-account.component';
import { LoginComponent } from './main/pages/auth/login/login.component';
import { RegisterComponent } from './main/pages/auth/register/register.component';
import { AboutUsComponent } from './main/pages/about-us/about-us.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './main/pages/home/search/search.component';
import { WeatherDataComponent } from './main/pages/home/weather-data/weather-data.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    MyAccountComponent,
    LoginComponent,
    RegisterComponent,
    AboutUsComponent,
    SearchComponent,
    WeatherDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
