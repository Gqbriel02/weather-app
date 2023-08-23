import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/main/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage?: string;

  email: string = 'gabrielionita2002@gmail.com';
  password: string = 'gabrielionita2002';

  constructor(private authService: AuthService, private router: Router) { }

  private validateData(): any {
    if (this.email != '' && this.password != '') {
      return true;
    }
    return false;
  }
 
  login(): void {
    if (this.validateData()) {
      this.authService.login(this.email, this.password).subscribe(
        {
          next: (data) => {
            this.authService.saveToken(data.token);
            this.router.navigate(['/home']);
          },
          complete: () => { },
          error: (error) => {
            console.error('Login failed:', error);
            this.errorMessage = 'Invalid credentials. Please try again.';
          }
        }
      );
    }
  }


}
