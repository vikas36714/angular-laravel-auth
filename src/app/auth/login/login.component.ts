import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginInvalid = false;
  submitted: boolean = false;
  message: any;
  success: boolean = false;
  errors: any;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
      this.loginForm = this.fb.group({
        email: ['', Validators.email],
        password: ['', Validators.required]
      });

   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if(this.loginForm.invalid){ return ; }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
        this.errors = error.error;
      },() => {
        this.authState.setAuthState(true);
        this.loginForm.reset()
        this.router.navigate(['account/user']);
      }
    );

  }

  // Handle response
  responseHandler(data:any){
    this.token.handleData(data.success.token);
  }



}
