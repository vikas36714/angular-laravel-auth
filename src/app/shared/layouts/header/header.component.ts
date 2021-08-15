import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../auth-state.service';
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Material Application';

  isAuthenticated = false;

  constructor( private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    ) { }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe(val => {
      console.log(val);
      this.isAuthenticated = val;
    });
  }

   // Logout
   logOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

}
