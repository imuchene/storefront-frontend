import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductState } from '../states/product.state';
import {v4 as uuid } from 'uuid'; 
import { addProductAction, loadProductsAction } from '../actions/product.actions';
import { AppState } from '../reducers/product.reducer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {


  products: Observable<Product[]>;
  loading: Observable<boolean>;
  error: Observable<Error>;

  constructor(private store: Store<AppState>) { 
    this.loading = this.store.select(state => state.products.loading);

    this.store.dispatch(loadProductsAction());
    this.products = this.store.select(state => state.products.products);
  }

  addProduct(product: Product){
    this.store.dispatch(addProductAction({ product: product}));
  }


}
