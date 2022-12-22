import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  dataSource: Product[];
  displayedColumns: string[] = ['ID', 'Name', 'Price', 'Action'];

  constructor(private store: Store<AppState>) { 
    this.cart = this.store.select(state => state.products.cart);
    this.cart.subscribe(res => {
      this.dataSource = res;
     
      this.countAndGroupLikeItems(this.dataSource);

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

    for (const entry of uniqueProducts){
        const testCartItem = new CartItem({
        name: entry.name,
        quantity: counts[entry.id],
        unitPrice: entry.unitPrice,
        subTotal: (counts[entry.id]) * entry.unitPrice
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
