import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductState } from './product.state';
import {v4 as uuid } from 'uuid'; 
import { AddProductAction, DeleteProductAction } from '../actions/product.action';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  products: Observable<Product[]>;

  constructor(private store: Store<ProductState>) { 
    this.products = this.store.select(state => state.product);
  }

  addProduct(name: string, price: string){
    const product: Product = {
      id: uuid(),
      name: name,
      price: Number(price)
    };
    this.store.dispatch(new AddProductAction(product));
  }

  deleteProduct(id: string){
    this.store.dispatch(new DeleteProductAction(id));
  }
}
