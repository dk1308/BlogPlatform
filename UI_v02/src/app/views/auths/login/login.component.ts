import { LoginGoogleRequest } from './../models/login-google-request.model';
declare var google: any;
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoginRequest } from 'src/app/views/auths/models/login-request.model';
import { AuthService } from 'src/app/views/auths/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../models/register-request.model';
import { error } from 'console';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginRequest: LoginRequest;
  loginGoogleRequest: LoginGoogleRequest;
  loginSubscription?: Subscription;
  @ViewChild('form', { static: false }) loginForm: NgForm = {} as NgForm
  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService,
    private ngx: NgxUiLoaderService) {
    this.loginRequest = {
      username: '',
      password: ''
    };
    this.loginGoogleRequest = {
      email: '',
      username: '',
      password: ''
    }
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '900070674957-km302hf1o7np90s3nf5pbsu53edaect6.apps.googleusercontent.com',
      callback: (res: any) => {
        var userInfo = this.handleLogin(res);
        console.log(userInfo);
        this.loginGoogleRequest = {
          email: userInfo.email,
          username: this.getNameFromEmail(userInfo.email),
          password: userInfo.email
        };
        this.loginWithGoogle();
      }
    });



    google.accounts.id.renderButton(document.getElementById('google-btn'),
      {
        theme: 'filled_blue',
        shape: 'rectangular',
        width: 100
      });
  }

  onFormSubmit() {
    this.login(this.loginRequest.username, this.loginRequest.password);
  }

  async loginWithGoogle() {
    this.ngx.start();
    if (this.loginGoogleRequest) {
      var registerRequest: RegisterRequest = {
        email: this.loginGoogleRequest.email,
        username: this.loginGoogleRequest.username,
        password: this.loginGoogleRequest.password,
      }
      this.authService.register(registerRequest).subscribe({
        // if this account does not exist => register 
        next: res => {
          this.ngx.stop();
          this.toastr.success('Register successfully!'); 
          this.login(this.loginGoogleRequest.username, this.loginGoogleRequest.password);
        },
        // if this account already exists, log in
        error: err => {
          this.login(this.loginGoogleRequest.username, this.loginGoogleRequest.password);
        }
      })
    }
  }

  login(username: string, password: string) {
    this.loginRequest = {
      username: username,
      password: password
    }
    this.loginSubscription = this.authService.login(this.loginRequest).subscribe({
      next: response => {
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined,
          '/', undefined, true, 'Strict');
        this.authService.setUser({
          username: response.username,
          email: response.email,
          roles: response.roles.join(',')
        });
        if (response.roles.includes('Writer')) {
          this.router.navigateByUrl('admin');
        } else {
          this.router.navigateByUrl('');
        }
        this.toastr.success('Login successfully!');
      },
      error: err => {
        this.toastr.error('Username or password is incorrect!');
        this.loginForm.resetForm();
      }
    });
  }

  decodeToken(token: string): any {
    return JSON.parse(atob(token));
  }

  handleLogin(res: any): any {
    try {
      return this.decodeToken(res.credential.split('.')[1]);
    } catch (error) {
      return {};
    }
  }

  getNameFromEmail(email: string): string {
    var indexOfRateSign = email.indexOf("@");
    email = email.slice(0, indexOfRateSign);
    return email;
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
