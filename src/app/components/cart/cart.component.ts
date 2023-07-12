import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { totalItemsAction } from '../../actions/cart-item.actions';
import { deleteProductAction } from '../../actions/product.actions';
import { Product } from '../../models/product.model';
import { AppState } from '../../reducers/product.reducer';
import { CartItem } from '../../models/cart-item.model';
import { countAndGroupLikeItems } from '../../utils/count-and-group.util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart: Observable<Product[]>;
  dataSource: CartItem[];
  displayedColumns: string[] = ['Name', 'Quantity', 'Price', 'Subtotal', 'Action'];
  totalItems: number;
  totalValue: number;
  count: number;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.cart = this.store.select((state) => state.products.cart);

    if (this.cart) {
      this.cart.subscribe((res) => {
        this.dataSource = countAndGroupLikeItems(res);
        this.totalItems = this.dataSource.reduce((total, item) => item.quantity + total, 0);
        this.totalValue = Number(this.dataSource.reduce((total, item) => item.subTotal + total, 0).toFixed(2));
        this.store.dispatch(
          totalItemsAction({
            totalItems: this.totalItems,
            totalValue: this.totalValue,
          })
        );
      });
    }
  }

  deleteProduct(id: string) {
    this.store.dispatch(deleteProductAction({ productId: id }));
    this.snackBar.open('Product successfully removed from the cart', 'Dismiss', { duration: 3000 });
  }

  checkLogin() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/payment']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
