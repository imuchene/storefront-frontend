import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerRegistration } from '../models/customer-registration.model';

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
    private snackBar: MatSnackBar,
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
        this.openSnackBar('Successfully registered');
        this.router.navigate(['login']);
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
