import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../reducers/product.reducer';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarUtil } from '../../../app/utils/snackbar.util';
import { AutoLogoffService } from '../../../app/services/auto-logoff.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'storefront-frontend';
  totalItems: Observable<number>;
  totalValue: Observable<number>;
  navTotalItems: number;
  hidden: boolean;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    public authService: AuthService,
    private autoLogoff: AutoLogoffService, 
    private snackBarUtil: SnackBarUtil,
  ) {
    this.totalItems = this.store.select((state) => state.products.count);
    this.totalValue = this.store.select((state) => state.carts.totalValue);

    this.autoLogoff;
  }

  ngOnInit(): void {
    this.hidden = true;

    if (this.totalItems) {
      this.totalItems.subscribe((res) => {
        this.navTotalItems = res;
        if (this.navTotalItems > 0) {
          this.hidden = false;
        } else {
          this.hidden = true;
        }
      });
    }
  }

  loadCart() {
    this.router.navigateByUrl('cart');
  }

  logOut() {
    this.authService.logout().subscribe(
      {
        next: () => {
          this.router.navigate(['/']);
        },
        // On logout failure
        error: (error: HttpErrorResponse) => {
          this.snackBarUtil.openSnackBar(error);
        },
      }
    );


  
  }
}
