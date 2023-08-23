import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/main/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMessage?: string;
  username: string = 'gabrielionita2002';
  email: string = 'gabrielionita2002@gmail.com';
  password: string = 'gabrielionita2002';
  repeat_password: string = 'gabrielionita2002';

  constructor(private authService: AuthService, private router: Router) { }


  private validateData(): any {
    if (this.username != '' && this.email != '' && this.password != '' && this.repeat_password != '' && this.password == this.repeat_password) {
      return true;
    }
    return false;
  }

  // Example in a login component
  register(): void {
    if (this.validateData()) {
      this.authService.register(this.username, this.email, this.password).subscribe(
        {
          next: (data) => {
            //this.authService.saveToken(data.token);
            console.log(data);
            this.router.navigate(['/login']);
          },
          complete: () => { },
          error: (error) => {
            console.error('Register failed:', error);
            this.errorMessage = 'Invalid credentials. Please try again.';
          }
        }
      );
    }



  }

}