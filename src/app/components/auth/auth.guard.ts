import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | UrlTree | 
    Observable<boolean | UrlTree> {
    return this.authService.user.pipe(map(user => {
      const isLoggedIn = !!user;
      if (isLoggedIn) {
        return true
      }
      return this.router.createUrlTree(['/'])
    }))
  }
}