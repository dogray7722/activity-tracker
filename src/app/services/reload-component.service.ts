import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReloadComponentService {

  constructor(private router: Router) { }

  reloadComponent(routeUrl: string) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      return this.router.navigate([routeUrl]);
    }
}
