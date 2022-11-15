import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductState } from './product.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(private store: Store<ProductState>) { 
    this.products = this.store.select(state => state.product);
  }

  addProduct(name: string, price: string){
    this.store.dispatch({
      type: 'ADD_PRODUCT',
      payload: <Product>{
        name: name,
        price: Number(price),
      }
    });
  }

  ngOnInit(): void {
  }

}
