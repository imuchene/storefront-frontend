import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './reducers/product.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'storefront-frontend';
  totalItems: Observable<number>;
  totalValue: Observable<number>;
  navTotalItems: number;

  constructor(private router: Router, private store: Store<AppState>) {
    this.totalItems = this.store.select((state) => state.products.count);
    this.totalValue = this.store.select((state) => state.carts.totalValue);

    this.totalItems.subscribe((res) => (this.navTotalItems = res));
  }

  loadCart() {
    this.router.navigateByUrl('cart');
  }
}
