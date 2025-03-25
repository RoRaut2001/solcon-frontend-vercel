import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    /****
     step 1: Get Token from session
     step 2: If found navigate to dashboard
     step 3: If token is not present navigate to login
     ****/
    const token = localStorage.getItem('token');
    token ?  this.router.navigate(['/dashboard']): this.router.navigate(['/login']);
  }
}
