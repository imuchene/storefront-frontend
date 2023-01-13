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

  constructor(private store: Store<AppState>) { 
    this.cart = this.store.select(state => state.products.cart);
    this.cart.subscribe(res => {
     
      this.dataSource = this.countAndGroupLikeItems(res);

      const totalItems = this.dataSource.reduce((total, item) => item.quantity + total, 0);
      const totalValue = this.dataSource.reduce((total, item) => item.subTotal + total, 0);

      console.log('total items', totalItems);
      console.log('total value', totalValue);

      this.store.dispatch(totalItemsAction({ totalItems: totalItems, totalValue: totalValue}));

    });
  }


  deleteProduct(id: string){
    this.store.dispatch(deleteProductAction({ productId: id}));
  }

  countAndGroupLikeItems(products: Product[]): CartItem[] {
    // Get a count of all the products added by the customer
    const counts:any = {};
    products.forEach( product => counts[product.id] = (counts[product.id] || 0) + 1)

    // Remove all duplicate products from the cart
    const uniqueProducts = products.filter(this.onlyUnique);

    
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
      newCartItems.push(testCartItem)
    }


   return newCartItems;
  }

  onlyUnique(value:any, index:any,self:any){
    return self.indexOf(value) === index;
  }

  // TODO: Get total amount and total quantity from the cart

}
