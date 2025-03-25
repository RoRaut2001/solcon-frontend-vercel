import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    /****
     step 1: Get Token from session
     step 2: If found navigate to dashboard
     step 3: If token is not present navigate to login
     ****/
    const token = localStorage.getItem('token');
    token ?  this.router.navigate(['/dashboard']): this.router.navigate(['/login']);
  }

  visitSite(): void {
    window.open('https://www.solcon.capital/', '_blank');
  }

  onLogin(): void {
    /**** Collect username and password from form ****/
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    if (!this.loginForm.valid) {
      /**** check if form is valid ****/
      if (!username && !password) {

        this.toastr.error('Both fields are required.', 'Oops!', {
          timeOut: 3000,
          closeButton: true,
          positionClass: 'toast-top-right',
          progressBar: true,
        });
      } else if (!username) {
        this.toastr.error('Username is required.', 'Oops!', {
          timeOut: 3000,
          closeButton: true,
          positionClass: 'toast-top-right',
          progressBar: true,
        });
      } else if (!password) {
        this.toastr.error('Password is required.', 'Oops!', {
          timeOut: 3000,
          closeButton: true,
          positionClass: 'toast-top-right',
          progressBar: true,
        });
      }

      console.log(this.loginForm.value);
      return;
    }
    /****
     step 1: Access auth repository
     step 2: Call login manager by passing username and password
     step 3: If Login successful set token in session and navigate to dashboard
     step 4: update header from ApiClient with new token
     ****/
    this.authService.login(username,password).subscribe(({
      next:(response) => {
        this.toastr.success('Login Successful! Redirecting...', 'Success', {
          timeOut: 2000,
          closeButton: true,
          positionClass: 'toast-top-right',
          progressBar: true,
        });
        localStorage.setItem('token', response.token);
        setTimeout(() => {
          this.router.navigate(['/dashboard']).then(() => {
            console.log('Navigation Successful!');
          }).catch(err => {
            console.error('Navigation Failed: ', err);
            this.toastr.error('Oops! Something went wrong. Please try again.', 'Error', {
              timeOut: 3000,
              closeButton: true,
              positionClass: 'toast-top-right',
              progressBar: true,
            });
          });
        }, 1000);
      },
      error: error => {
        this.toastr.error('Login Failed', 'Oops!', {
          timeOut: 3000,
          closeButton: true,
          positionClass: 'toast-top-right',
          progressBar: true,
        });
        console.log(error);
      }
    }))

  }
}
