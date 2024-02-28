import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/product.reducer';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentMethods } from '../../enums/payment-methods.enum';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';
import { countAndGroupLikeItems } from '../../utils/count-and-group.util';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order.model';
import { MatDialog } from '@angular/material/dialog';
import { StripeDialogComponent } from '../stripe-dialog/stripe-dialog.component';
import { Router } from '@angular/router';
import { ExpressCheckoutComponent } from '../express-checkout/express-checkout.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  form: FormGroup;
  paymentMethod: string;
  paymentMethods: string[] = Object.values(PaymentMethods);
  totalCartValue: Observable<number>;
  totalValue: number;
  orderItems: CartItem[];
  cart: Observable<Product[]>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private router: Router,
    private bottomSheet: MatBottomSheet,
  ) {
    this.totalCartValue = this.store.select((state) => state.carts.totalValue);
    this.cart = this.store.select((state) => state.products.cart);

    if (this.totalCartValue) {
      this.totalCartValue.subscribe((res) => (this.totalValue = res));
    }
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
      paymentMethod: this.paymentMethod,
    };

    this.ordersService.createOrder(order).subscribe((result) => {
      if (result.clientSecret && this.paymentMethod === PaymentMethods.CreditOrDebitCard) {
        this.openStripeDialog({
          name: result.customerName,
          amount: this.totalValue,
          clientSecret: result.clientSecret,
        });
      }

      if (this.paymentMethod === PaymentMethods.ExpressCheckout) {
        this.openExpressCheckoutBottomSheet({
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

    dialogRef.afterClosed().subscribe(() => {
      this.form.disable({ onlySelf: true });
      this.router.navigate(['/']);
    });
  }

  openExpressCheckoutBottomSheet(data: any) {
    const bottomSheetRef = this.bottomSheet.open(ExpressCheckoutComponent, { data: { data } });

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.form.disable({ onlySelf: true });
      this.router.navigate(['/']);
    });
  }

  checkTotalCartValue(): ValidatorFn {
    return (): ValidationErrors | null => {
      return this.totalValue < 1 ? { valid: true } : null;
    };
  }
}
