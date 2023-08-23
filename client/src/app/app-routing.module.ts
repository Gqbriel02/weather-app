import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/pages/auth/login/login.component';
import { RegisterComponent } from './main/pages/auth/register/register.component';
import { HomeComponent } from './main/pages/home/home.component';
import { AboutUsComponent } from './main/pages/about-us/about-us.component';
import { AuthGuard } from './main/_guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    //data: { role: [Role.User] }
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    //canActivate: [AuthGuard],
    //data: { role: [Role.User] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
