import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../components/auth/user.model';
import { SnackBarService } from './snack-bar-service.service';
import { environment } from '../../environments/environment'

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private snackBarService: SnackBarService,
              private router: Router) { }

  register(email: string, password: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebase.apiKey
    return this.http.post<AuthResponseData>(url,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorRes => {
        if (!errorRes.error || !errorRes.error.error) {
          this.snackBarService.snackBarMessage(false, "registrationError")
          return throwError(() => new Error())
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            this.snackBarService.snackBarMessage(false, "emailTaken")
            break
          default:
            this.snackBarService.snackBarMessage(false, "registrationError")
        }
        return throwError(() => new Error())
      }),
        tap(resData => {
          this.handleAuthentication(
            resData.email, 
            resData.localId, 
            resData.idToken, 
            +resData.expiresIn)
        }
      )
    )
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;

    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email, 
      userData.id, 
      userData._token,
      new Date(userData._tokenExpirationDate)
    )
    if (loadedUser.token) {
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
      this.router.navigate(['/events'])
    }
  }

  login(email: string, password: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebase.apiKey
    return this.http.post<AuthResponseData>(url,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorRes => {
        if (!errorRes.error || !errorRes.error.error) {
          this.snackBarService.snackBarMessage(false, "loginError")
          return throwError(() => new Error())
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_NOT_FOUND':
            this.snackBarService.snackBarMessage(false, "unregistered")
            break
          case 'INVALID_PASSWORD':
            this.snackBarService.snackBarMessage(false, "invalidPassword")
            break
          default:
            this.snackBarService.snackBarMessage(false, "loginError")
        }
        return throwError(() => new Error())
      }),
      tap(resData => {
        this.handleAuthentication(
          resData.email, 
          resData.localId, 
          resData.idToken, 
          +resData.expiresIn)
      }
    ))
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/'])
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn *1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }
}

