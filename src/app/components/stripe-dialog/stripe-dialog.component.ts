import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PaymentIntentResult, StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { Payment } from '../../models/payment.model';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/product.reducer';
import { resetCartAction } from '../../actions/product.actions';
import { PaymentStatus } from '../../enums/payment-status.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarUtil } from '../../../app/utils/snackbar.util';

@Component({
  selector: 'app-stripe-dialog',
  templateUrl: './stripe-dialog.component.html',
  styleUrls: ['./stripe-dialog.component.scss'],
})
export class StripeDialogComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  stripePaymentElement: StripePaymentElementComponent;

  elementsOptions: StripeElementsOptions = {
    locale: 'en-GB',
    appearance: {
      theme: 'flat',
    },
  };

  totalAmount: number;

  paying: boolean = false;

  paymentData: Payment;

  clientSecret: string;

  options: StripePaymentElementOptions = {
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: false,
    },
  };

  constructor(
    // todo: get the correct type for the data property below
    @Inject(MAT_DIALOG_DATA)
    data: any,
    private stripeService: StripeService,
    private store: Store<AppState>,
    private dialog: MatDialog,
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

  pay() {

    if (this.paying) {
      return;
    }

    this.paying = true;

    this.stripeService
      .confirmPayment({
        elements: this.stripePaymentElement.elements,
        confirmParams: {
          return_url: environment.returnUrl,
          payment_method_data: {
            billing_details: {
              name: this.paymentData.name,
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe({
        next: (result: PaymentIntentResult) => {
          this.paying = false;

          if (result.error) {
            // Show the error to the customer e.g. insufficient funds
            this.snackBarUtil.openSnackBar(String(result.error.message));
          } else {
            if (result.paymentIntent?.status === PaymentStatus.Succeeded) {
              // Show a success message to your customer
              this.store.dispatch(resetCartAction());
              this.snackBarUtil.openSnackBar('Payment Succeeded');
              this.dialog.closeAll();
            }
          }
        },
        error: (error: HttpErrorResponse) => {
          this.snackBarUtil.openSnackBar(error);
        },
      });
  }
}
