import { Injectable, NgZone } from '@angular/core';
import { SnackBarUtil } from '../utils/snackbar.util';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLogoffService {
  isLoggedIn = false;

  MINUTES_UNTIL_AUTO_LOGOUT = 5;
  CHECK_INTERVAL = 1000;
  STORE_KEY = 'lastAction';

  constructor(
    private router: Router,
    private snackBarUtil: SnackBarUtil,
    private ngZone: NgZone,
    private authService: AuthService,
  ) {
    if (this.authService.checkLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.check();
    this.initListener();
    this.initInterval();
  }

  get lastAction(): number {
    return parseInt(String(localStorage.getItem(this.STORE_KEY)));
  }

  set lastAction(value: number) {
    localStorage.setItem(this.STORE_KEY, String(value));
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
      }, this.CHECK_INTERVAL);
    });
  }

  reset() {
    this.lastAction = Date.now();
  }

  check() {
    const now = Date.now();
    const timeLeft = this.lastAction + this.MINUTES_UNTIL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;

    this.ngZone.run(() => {
      if (isTimeout && this.isLoggedIn) {
        this.snackBarUtil.openSnackBar('Your session expired due to inactivity. Kindly login again to continue');
        this.authService.logout();
        this.router.navigate(['/']);
      }
    });
  }
}
