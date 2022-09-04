import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SnackBarService } from './snack-bar-service.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private snackBarService: SnackBarService) { }

  url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLi98jytycQ2mbV9s_Xrpj-j8HZQOcn_A`

  register(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.url,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorRes => {
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            this.snackBarService.snackBarMessage(false, "emailTaken")
            break
          default:
            this.snackBarService.snackBarMessage(false, "registrationError")
        }
        return throwError(() => new Error(errorRes))
      })
    )
  }
}

