import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { OrderResponse } from '../models/responses/order-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<OrderResponse> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };

    return this.http.post<any>(environment.apiUrl + 'orders', order, httpOptions);
  }
}
