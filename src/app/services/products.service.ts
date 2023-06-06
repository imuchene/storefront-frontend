import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(environment.baseUrl + 'products').pipe(delay(500));
  }
}
