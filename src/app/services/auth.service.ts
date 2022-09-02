import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor(private http: HttpClient) { }

  url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLi98jytycQ2mbV9s_Xrpj-j8HZQOcn_A`

  register(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.url,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
  }
}

