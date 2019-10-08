import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService
      .user()
      .subscribe(
        (user: User) => {
          if (user && user.roles.includes('ROLE_ADMIN')) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        },
        error => {
          this.router.navigate(['/auth/login']);
          return false;
        }
      );
    return true;
  }
}
