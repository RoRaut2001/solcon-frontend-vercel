import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {SplashComponent} from './components/splash/splash.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path: '', component: SplashComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

