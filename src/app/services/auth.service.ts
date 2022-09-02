import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = "https://activitytracker-21247-default-rtdb.firebaseio.com"
  key = "AIzaSyBLi98jytycQ2mbV9s_Xrpj-j8HZQOcn_A"

  register(email: string, password: string) {
    return this.http.post<AuthResponseData>(`${this.url}/${this.key}`,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    )
  }


}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
