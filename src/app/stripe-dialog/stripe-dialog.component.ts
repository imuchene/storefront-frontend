import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { Payment } from './payment';

@Component({
  selector: 'app-stripe-dialog',
  templateUrl: './stripe-dialog.component.html',
  styleUrls: ['./stripe-dialog.component.scss']
})
export class StripeDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(StripePaymentElementComponent)
  stripePaymentElement: StripePaymentElementComponent;

  elementsOptions: StripeElementsOptions = {
    locale: 'en-GB',
    appearance: {
      theme: 'flat',
    },
  };


  paying: boolean = false;

  paymentData: Payment;
  clientSecret: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: any,
    private stripeService: StripeService
  ) {
    this.paymentData = data.data;

    if (this.paymentData) {
      this.clientSecret = this.paymentData.clientSecret;
    }

  }

  ngOnInit(): void {
    this.elementsOptions.clientSecret = this.clientSecret;
  }

  ngAfterViewInit(){
    this.stripePaymentElement.elements?.create('payment', {
      layout: {
        type: 'accordion',
        defaultCollapsed: false,
        radios: true,
        spacedAccordionItems: false
      }
    })
  }

  pay() {
    this.paying = true;
    this.stripeService
      .confirmPayment({
        elements: this.stripePaymentElement.elements,
        confirmParams: {
          return_url: 'http://localhost:4200/sales',
          payment_method_data: {
            billing_details: {
              name: this.paymentData.name
            }
          }
        },
        redirect: 'if_required'
      })
      .subscribe(
        {
          next: (result) => {
            this.paying = false;
            console.log('payment result', result);
  
            if (result.error) {
              // Show the error to the customer e.g. insufficient funds
              alert(result.error.message);
            } else {
              if (result.paymentIntent?.status === 'succeeded') {
                // Show a success message to your customer
                alert('Payment was successful');
              }
            }
          },
          error: (error) => {
            console.error('An error occurred when completing the payment', error);
          }
        }
      );
  }
}
