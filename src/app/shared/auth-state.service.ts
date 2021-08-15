import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
//import { TokenService } from '../shared/token.service';
import { TokenService } from '../shared/token.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthStateService {

  private userState = new BehaviorSubject<boolean>(this.authService.isLoggedIn());
  userAuthState = this.userState.asObservable();

  constructor(
    //public token: TokenService,
    public authService: AuthService
  ) { }

  setAuthState(value: boolean) {
    this.userState.next(value);
  }

}
