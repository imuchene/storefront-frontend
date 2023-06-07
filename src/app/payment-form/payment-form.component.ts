import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/product.reducer';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentMethod } from '../enums/payment-methods.enum';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { countAndGroupLikeItems } from '../utils/count-and-group.util';
import { OrdersService } from '../services/orders.service';
import { Order } from '../models/order.model';
import { MatDialog } from '@angular/material/dialog';
import { StripeDialogComponent } from '../stripe-dialog/stripe-dialog.component';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  form: FormGroup;
  paymentMethod: string;
  paymentMethods: string[] = [
    PaymentMethod.CreditOrDebitCard,
    PaymentMethod.Mpesa,
  ];
  totalCartValue: Observable<number>;
  totalValue: number;
  orderItems: CartItem[];
  cart: Observable<Product[]>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private ordersService: OrdersService,
    private dialog: MatDialog
  ) {
    this.totalCartValue = this.store.select((state) => state.carts.totalValue);
    this.cart = this.store.select((state) => state.products.cart);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      paymentRadio: ['', [Validators.required]],
    });
  }

  checkOut() {
    this.paymentMethod = this.form.get('paymentRadio')?.value;
    this.totalCartValue.subscribe((res) => (this.totalValue = res));
    this.cart.subscribe((result) => {
      this.orderItems = countAndGroupLikeItems(result);
    });

    const orderItems = this.orderItems.map(({ id, quantity }) => ({
      productId: id,
      quantity,
    }));

    const order: Order = {
      totalAmount: this.totalValue,
      orderItems: orderItems,
    };

    this.ordersService.createOrder(order).subscribe((result) => {
      if (
        result.clientSecret &&
        this.paymentMethod === PaymentMethod.CreditOrDebitCard
      ) {
        this.openDialog({
          name: result.customerName,
          amount: this.totalValue,
          clientSecret: result.clientSecret,
        });
      }
    });
  }

  openDialog(data: any) {
    this.dialog.open(StripeDialogComponent, {
      width: '70%',
      height: '60%',
      data: { data },
    });
  }
}
