import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'activity-tracker';
  private userSub: Subscription;
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
