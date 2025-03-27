import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {SplashComponent} from './components/splash/splash.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CompanyListComponent} from './components/company-list/company-list.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  {path: '', component: SplashComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'company-list', component: CompanyListComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

