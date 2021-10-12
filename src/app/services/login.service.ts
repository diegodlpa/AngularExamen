import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from './models/user.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "https://reqres.in/api/login"
  constructor(private http: HttpClient) {

   }

   login(userInfo: UserInfo)
   {
     return this.http.post(`${this.baseUrl}`, userInfo)
   }
   obtenerToken(): string {
    return localStorage.getItem("token");
  }

  obtenerExpiracionToken(): string {
    return localStorage.getItem("tokenExpiration");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }

  estaLogueado(): boolean {

    var exp = this.obtenerExpiracionToken();

    if (!exp) {
      // el token no existe
      return false;
    }

    var now = new Date().getTime();
    var dateExp = new Date(exp);

    if (now >= dateExp.getTime()) {
      // ya expiró el token
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      return false;
    } else {
      return true;
    }
    
  }
}
