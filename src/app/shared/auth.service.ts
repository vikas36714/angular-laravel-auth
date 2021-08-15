import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'http://127.0.0.1:8000/api/';
  redirectUrl: any;

  constructor(private http: HttpClient, private router: Router) { }

  // user registration
  register(data: IUser[]): Observable<IUser[]>{
    return this.http.post<IUser[]>(this.serverUrl + 'register', data);
  }

  // user login
  login(email: any, password: any): Observable<any> {
    console.log('email', email)
    return this.http.post<any>(this.serverUrl + 'login', {email: email, password: password});
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(this.serverUrl + 'details');
  }

  isLoggedIn(){
    if(localStorage.getItem('auth_token')){
      return true;
    }else{
      return false;
    }
  }

  // getAuthorizationToken() {
  //   const token = JSON.parse(localStorage.getItem('auth_token'));
  //   return token;
  // }

  // logout(){
  //   localStorage.removeItem('auth_token');
  //   localStorage.clear();
  //   this.router.navigate(['/login']);
  // }


}
