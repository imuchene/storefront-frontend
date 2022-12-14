import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductState } from './product.state';
import {v4 as uuid } from 'uuid'; 
import { addProductAction, deleteProductAction, loadProductsAction } from '../actions/product.actions';
import { AppState } from '../reducers/product.reducer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  cart: Observable<Product[]>;
  products: Observable<Product[]>;
  loading: Observable<boolean>;
  error: Observable<Error>;

  constructor(private store: Store<AppState>) { 
    this.cart = this.store.select(state => state.products.cart);
    this.loading = this.store.select(state => state.products.loading);

    this.store.dispatch(loadProductsAction());
    this.products = this.store.select(state => state.products.products);
  }

  addProduct(name: string, price: string){
    const product: Product = {
      id: uuid(),
      name: name,
      unitPrice: Number(price),
      description: 'Test Description',
      imageUrl: ''
    };

    
    this.store.dispatch(addProductAction({ product: product}));
  }

  deleteProduct(id: string){
    this.store.dispatch(deleteProductAction({ productId: id}));
  }
}
