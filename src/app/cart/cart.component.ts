import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteProductAction } from '../actions/product.actions';
import { Product } from '../product/product.model';
import { AppState } from '../reducers/product.reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart: Observable<Product[]>;

  constructor(private store: Store<AppState>) { 
    this.cart = this.store.select(state => state.products.cart);
  }


  deleteProduct(id: string){
    this.store.dispatch(deleteProductAction({ productId: id}));
  }

}
