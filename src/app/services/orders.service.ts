import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient, 
  ) { }

  createOrder(order: Order){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      withCredentials: true,
    };
    
    return this.http.post<any>(environment.apiUrl + 'orders', order, httpOptions);
  }
}
