import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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
  paymentMethods: string[] = [PaymentMethod.CreditOrDebitCard, PaymentMethod.Mpesa];
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
    this.totalCartValue.subscribe((res) => (this.totalValue = res));
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      paymentRadio: ['', [Validators.required, this.checkTotalCartValue()]],
    });
  }

  pay() {
    this.paymentMethod = this.form.get('paymentRadio')?.value;
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
      if (result.clientSecret && this.paymentMethod === PaymentMethod.CreditOrDebitCard) {
        this.openStripeDialog({
          name: result.customerName,
          amount: this.totalValue,
          clientSecret: result.clientSecret,
        });
      }
    });
  }

  openStripeDialog(data: any) {
    const dialogRef = this.dialog.open(StripeDialogComponent, {
      width: '70%',
      height: '60%',
      data: { data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.form.disable({ onlySelf: true });
    });
  }

  checkTotalCartValue(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.totalValue < 1 ? { valid: true } : null;
    };
  }
}
