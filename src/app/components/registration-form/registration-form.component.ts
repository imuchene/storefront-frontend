import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerRegistration } from '../../models/customer-registration.model';
import { SnackBarUtil } from 'src/app/utils/snackbar.util';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBarUtil: SnackBarUtil,
    public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    const customerRegistration: CustomerRegistration = this.form.value;

    this.authService.register(customerRegistration).subscribe({
      next: (res) => {
        this.snackBarUtil.openSnackBar('Successfully registered');
        this.router.navigate(['login']);
      },
      // On login failure
      error: (error: HttpErrorResponse) => {
        this.snackBarUtil.openSnackBar(error);
      },
    });
  }
}
