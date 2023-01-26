import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { totalItemsAction } from '../actions/cart-item.actions';
import { deleteProductAction } from '../actions/product.actions';
import { Product } from '../product/product.model';
import { AppState } from '../reducers/product.reducer';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart: Observable<Product[]>;
  dataSource: CartItem[];
  displayedColumns: string[] = ['Name', 'Quantity', 'Price', 'Subtotal', 'Action'];
  totalItems: number;
  totalValue: number;
  count: number;

  constructor(private store: Store<AppState>) { 
    this.cart = this.store.select(state => state.products.cart);
    
    
    this.cart.subscribe(res => {

      

      this.dataSource = this.countAndGroupLikeItems(res);

      this.totalItems = this.dataSource.reduce((total, item) => item.quantity + total, 0);
      this.totalValue = Number(this.dataSource.reduce((total, item) => item.subTotal + total, 0).toFixed(2));

      this.store.dispatch(totalItemsAction({ totalItems: this.totalItems, totalValue: this.totalValue}));

    });
  }




  deleteProduct(id: string){
    this.store.dispatch(deleteProductAction({ productId: id}));
  }

  countAndGroupLikeItems(products: Product[]): CartItem[] {
    // Get a count of all the products added by the customer
    const counts:any = {};
    products.forEach( product => counts[product.id] = (counts[product.id] || 0) + 1);

    // Remove all duplicate products from the cart

    const uniqueProducts = products.filter((item, pos, self) => self.findIndex(v => v.id === item.id) === pos);
    
    // Create an array of cart items
    const newCartItems: CartItem[] = [];

    for (const product of uniqueProducts){
        const testCartItem = new CartItem({
        id: product.id,
        name: product.name,
        quantity: counts[product.id],
        unitPrice: product.unitPrice,
        subTotal: Number((counts[product.id] * product.unitPrice).toFixed(2))
      });
      newCartItems.push(testCartItem);
    }


   return newCartItems;
  }


}
