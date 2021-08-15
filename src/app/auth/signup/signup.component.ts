import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageComponent } from 'src/app/shared/message/message.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  message: any;
  errors: any;
  durationInSeconds = 5;
  MatSnackBarVerticalPosition = 'top';

  constructor(
      public router: Router,
      private fb: FormBuilder,
      private authService: AuthService,
      private _snackBar: MatSnackBar
    ) {
      this.signupForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }

  openSnackBar(message:any) {
    this._snackBar.openFromComponent(MessageComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message }
    });
  }

  ngOnInit(): void {  }

  // convenience getter for easy access to form fields
  get form_controls() { return this.signupForm.controls; }


  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) { return; }

    this.authService.register(this.signupForm.value).subscribe(
      result => {
        console.log(result)
        this.openSnackBar('User is registered.');
      },
      error => {
        this.errors = error.error;
      },
      () => {
        this.signupForm.reset()
        this.router.navigate(['login']);
      }
    )

  }


}
