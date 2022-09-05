import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { SnackBarService } from './snack-bar-service.service';

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
  constructor(private http: HttpClient,
              private snackBarService: SnackBarService) { }

  

  register(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLi98jytycQ2mbV9s_Xrpj-j8HZQOcn_A`
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
      })
    )
  }

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLi98jytycQ2mbV9s_Xrpj-j8HZQOcn_A`
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
      })
    )
  }
}

