import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomerLogin } from '../models/customer-login.model';
import { AppState } from '../reducers/product.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  form: FormGroup;
  totalItemsInCart: Observable<number>;
  totalItems: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {
    this.form = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
    });

    this.totalItemsInCart = this.store.select((state) => state.products.count);

    this.totalItemsInCart.subscribe((res) => (this.totalItems = res));
  }

  login() {
    const loginData: CustomerLogin = this.form.value;
    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.authService.setLoggedInCookie();
        this.openSnackBar('Logged in successfully');

        if (this.totalItems > 0) {
          this.router.navigate(['/payment']);
        } else {
          this.router.navigate(['/']);
        }
      },
      // On login failure
      error: (error: HttpErrorResponse) => {
        this.openSnackBar(error);
      },
    });
  }

  openSnackBar(message: HttpErrorResponse | string) {
    const messageToDisplay = typeof message === 'string' ? message : message.error.message;
    this.snackBar.open(messageToDisplay, 'Dismiss', {
      duration: 3000,
    });
  }
}
