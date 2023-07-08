import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../reducers/product.reducer';
import { AuthService } from '../../services/auth.service';
import { AutoLogoffService } from 'src/app/services/auto-logoff.service';

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

  constructor(
    private router: Router,
    private store: Store<AppState>,
    public authService: AuthService,
    private autoLogoff: AutoLogoffService
  ) {
    this.totalItems = this.store.select((state) => state.products.count);
    this.totalValue = this.store.select((state) => state.carts.totalValue);
  }

  ngOnInit() {
    if (this.totalItems) {
      this.totalItems.subscribe((res) => (this.navTotalItems = res));
    }
  }

  loadCart() {
    this.router.navigateByUrl('cart');
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}