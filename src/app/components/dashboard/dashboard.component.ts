import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true, // ✅ Required for standalone setup
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  logout() {
    /****
     step 1: Remove token from session
     step 2: Navigate to login page
     ****/
    localStorage.removeItem('token');this.router.navigate(['/login']);
  }

  ngOnInit(): void { }

}
