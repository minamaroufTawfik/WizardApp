import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AccessGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requireLogin = route.data.requireLogin ?? false;
    const anonymousOnly = route.data.anonymousOnly ?? false;
    const isLoggedIn = this.authService.isLoggedIn()
    if (requireLogin && !isLoggedIn) {
      this.router.navigateByUrl('auth/login');
      return false;
    } else if (anonymousOnly && isLoggedIn) {
      this.router.navigateByUrl('secure/steps');
      return false;
    }
    return true;

  }
}
