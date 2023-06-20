import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarUtil {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: HttpErrorResponse | string) {
    const messageToDisplay = typeof message === 'string' ? message : message.error.message;
    this.snackBar.open(messageToDisplay, 'Dismiss', {
      duration: 3000,
    });
  }
}
