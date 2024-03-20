import { UserDto } from './../models/user-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { RegisterRequest } from '../models/register-request.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, loginRequest);
  }

  setUser(user: User):void {
    this.user$.next(user);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('roles', user.roles);
  }

  getUser(): Observable<User | undefined> {
    return this.user$.asObservable();
  }

  getUserFromLocalStorage(): User | undefined {
    let email = localStorage.getItem('email');
    let username = localStorage.getItem('username');
    let roles = localStorage.getItem('roles');
    if(email && username && roles){
      const res : User = {
        username: username,
        email: email,
        roles: roles
      };
      return res;
    }
    return undefined;
  }

  register(request: RegisterRequest) {
    return this.httpClient.post<RegisterRequest>(`${environment.apiBaseUrl}/api/auth/register`, request)
  }

  getUserByEmail(email: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${environment.apiBaseUrl}/api/users?email=${email}`);
  }

  logOut():void {
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.user$.next(undefined);
  }

  loginWithGoogle() {
    return this.httpClient.post<void>(`${environment.apiBaseUrl}/signin-google`, null);
  }
}
