import { Injectable, NgZone } from '@angular/core';
import { SnackBarUtil } from '../utils/snackbar.util';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLogoffService {
  isLoggedIn = false;

  constructor(
    private router: Router,
    private snackBarUtil: SnackBarUtil,
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    if (this.authService.checkLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  getLastAction(): string {
    return String(localStorage.getItem('lastAction'));
  }

  lastAction(value: any) {
    localStorage.setItem('lastAction', JSON.stringify(value));
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, 1000);
    });
  }

  reset() {
    this.lastAction(Date.now());
  }

  check() {
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + 5 * 60 * 1000;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;

    this.ngZone.run(() => {
      if (isTimeout && this.isLoggedIn) {
        this.authService.logout();
        setTimeout(() => {
          console.log('Your session expired due to inactivity. Kindly login again to continue');
        });
        this.router.navigate(['/']);
      }
    });
  }
}
