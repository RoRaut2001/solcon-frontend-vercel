import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    NgOptimizedImage
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {

  }
}
