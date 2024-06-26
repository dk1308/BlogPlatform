import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  loginRequest: LoginRequest;
  loginSubscription?: Subscription;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router) {
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  onFormSubmit() {
    this.loginSubscription = this.authService.login(this.loginRequest).subscribe({
      next: response => {
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined,
        '/', undefined, true, 'Strict');
        this.authService.setUser({
          username: response.username,
          email: response.email,
          roles: response.roles.join(',')
        });
        this.router.navigateByUrl('');
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
