import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  StripeElementsOptions,
  StripeExpressCheckoutElementClickEvent,
  StripeExpressCheckoutElementConfirmEvent,
  StripeExpressCheckoutElementOptions,
} from '@stripe/stripe-js';
import { StripeElementsDirective, StripeExpressCheckoutComponent, injectStripe } from 'ngx-stripe';
import { environment } from '../../../environments/environment';
import { Payment } from 'src/app/models/payment.model';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { SnackBarUtil } from '../../../app/utils/snackbar.util';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/product.reducer';
import { resetCartAction } from 'src/app/actions/product.actions';

@Component({
  selector: 'app-express-checkout',
  standalone: true,
  imports: [StripeElementsDirective, StripeExpressCheckoutComponent],
  templateUrl: './express-checkout.component.html',
  styleUrl: './express-checkout.component.scss',
})
export class ExpressCheckoutComponent implements OnInit {
  paymentData: Payment;
  clientSecret: string;
  totalAmount: number;
  paying: boolean = false;

  stripe = injectStripe(environment.stripePublicKey);

  elementsOptions: StripeElementsOptions = {
    locale: 'en-GB',
  };

  options: StripeExpressCheckoutElementOptions = {
    buttonHeight: 50,
    buttonType: {
      applePay: 'check-out',
      googlePay: 'pay',
    },
  };

  @ViewChild(StripeExpressCheckoutComponent)
  expressCheckout!: StripeExpressCheckoutComponent;

  constructor(
    // todo: get the correct type for the data below
    @Inject(MAT_BOTTOM_SHEET_DATA)
    data: any,
    private store: Store<AppState>,
    private bottomSheet: MatBottomSheet,
    private snackBarUtil: SnackBarUtil,
  ) {
    this.paymentData = data.data;

    if (this.paymentData) {
      this.clientSecret = this.paymentData.clientSecret;
      this.totalAmount = this.paymentData.amount;
    }
  }

  ngOnInit(): void {
    this.elementsOptions.clientSecret = this.clientSecret;
  }

  onClicked(event: StripeExpressCheckoutElementClickEvent) {
    const { resolve } = event;

    resolve();
  }

  onConfirm(event: StripeExpressCheckoutElementConfirmEvent) {
    const { paymentFailed } = event;

    this.stripe
      .confirmPayment({
        elements: this.expressCheckout.elements,
        clientSecret: String(this.elementsOptions.clientSecret),
        confirmParams: {
          return_url: environment.returnUrl,
        },
        redirect: 'if_required',
      })
      .subscribe({
        next: () => {
          this.store.dispatch(resetCartAction());
          this.snackBarUtil.openSnackBar('Payment Succeeded');
          this.bottomSheet.dismiss();
        },
        error: (error) => {
          paymentFailed({ reason: 'fail' });
          this.snackBarUtil.openSnackBar(error);
        },
      });
  }
}
