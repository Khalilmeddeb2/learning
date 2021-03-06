import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/authentication.service';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loginComponent: LoginComponent
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      // authorised so return true
      return true;
    }
    if (currentUser) {
      // authorised so return true
      this.router.navigate(['/backoffice']);
    }
    //logged in so redirect to space with the return url
    return false;
  }
}
