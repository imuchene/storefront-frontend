import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductState } from '../states/product.state';
import {v4 as uuid } from 'uuid'; 
import { addProductAction, loadProductsAction } from '../actions/product.actions';
import { AppState } from '../reducers/product.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {


  products: Observable<Product[]>;
  loading: Observable<boolean>;
  error: Observable<Error>;

  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) { 
    this.loading = this.store.select(state => state.products.loading);

    this.store.dispatch(loadProductsAction());
    this.products = this.store.select(state => state.products.products);
  }

  addProduct(product: Product){
    this.store.dispatch(addProductAction({ product: product, count: 1}));
    this.snackBar.open('Product successfully added to the cart', 'Dismiss', { duration: 3000 });
  }


}
