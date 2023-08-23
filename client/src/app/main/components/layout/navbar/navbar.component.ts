import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/main/_models/user';
import { AuthService } from 'src/app/main/_services/auth.service';
import { LoggedService } from 'src/app/main/_services/logged.service';
import { UserService } from 'src/app/main/_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  isLogged: boolean = true;
  user: User | null = null;
  
  constructor(private authService: AuthService, 
    private logged: LoggedService, 
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void{
    this.logged.isLogged.subscribe((data) =>{
      this.isLogged = data;
    })

    this.logged.token.subscribe((token) =>{
      console.log('token: ',token);
      if(this.isLogged){
        this.userService.getAuthUser(token).subscribe((user) =>{
          this.user = user.user;
          console.log(user);
        })
      }
      
    })
  }

  logout(): void {
    this.logged.isLogged.next(false);
    this.authService.removeToken();
    this.router.navigate(['/login']);
    // Add any additional cleanup or navigation logic here
  }
  
}
