import { jwtDecode } from 'jwt-decode';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUserFromLocalStorage();

  let token = cookieService.get('Authorization');

  if (token) {
    // If token is not null
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);
    let expireTime = decodedToken.exp * 1000;
    let currentTime = new Date().getTime();
    if (expireTime < currentTime) {
      // If token is expired
      authService.logOut();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    } else {
      // If token is still valid, return true if admin, else return false
      if(user?.roles.includes('Writer')){
        return true;
      } else{
        alert('Unauthorized!');
        return false;
      }
    }
  } else {
    // If token is null
    authService.logOut();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
};
