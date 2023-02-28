import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar, 
    public dialog: MatDialog,
    private cookieService: CookieService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login() {
    const val = this.form.value;
    this.authService.login(val.email, val.password)
    .subscribe({
      next: (res) => {
        this.dialog.closeAll();
        this.getAuthCookie();
        this.router.navigate(['payment']).then(res => console.log(res));
      },
      // On login failure
      error: (error: HttpErrorResponse) => {
        this.openSnackBar(error);
      }
    });
  }

  openSnackBar(error: HttpErrorResponse) {
    this.snackBar.open(error.error.message, 'Dismiss', {
      duration: 3000
    });
  }

  routeToPayment(){
    
  }

  getAuthCookie(){
    const authCookie = this.cookieService.get('auth-cookie');
    console.log('auth-cookie', authCookie);
  }



}
