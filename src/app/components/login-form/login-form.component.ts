import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerLogin } from '../../models/customer-login.model';
import { AppState } from '../../reducers/product.reducer';
import { Store } from '@ngrx/store';
import { Observable, catchError } from 'rxjs';
import { SnackBarUtil } from 'src/app/utils/snackbar.util';

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
    private store: Store<AppState>,
    private snackBarUtil: SnackBarUtil
  ) {
    this.form = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
    });

    this.totalItemsInCart = this.store.select((state) => state.products.count);

    if (this.totalItemsInCart) {
      this.totalItemsInCart.subscribe((res) => (this.totalItems = res));
    }
  }

  login() {
    const loginData: CustomerLogin = this.form.value;
    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.authService.setLoggedInCookie();
        this.snackBarUtil.openSnackBar('Logged in successfully');

        if (this.totalItems > 0) {
          this.router.navigate(['/payment']);
        } else {
          this.router.navigate(['/']);
        }
      },
      // On login failure
      error: (error: HttpErrorResponse) => {
        this.snackBarUtil.openSnackBar(error);
      },
    });
  }
}
