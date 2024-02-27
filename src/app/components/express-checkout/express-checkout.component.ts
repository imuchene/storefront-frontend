import { Component } from '@angular/core';
import { StripeElementsOptions, StripeExpressCheckoutElementClickEvent, StripeExpressCheckoutElementOptions } from '@stripe/stripe-js';
import { StripeElementsDirective, StripeExpressCheckoutComponent, injectStripe } from 'ngx-stripe';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-express-checkout',
  standalone: true,
  imports: [StripeElementsDirective, StripeExpressCheckoutComponent],
  templateUrl: './express-checkout.component.html',
  styleUrl: './express-checkout.component.scss'
})
export class ExpressCheckoutComponent {

  stripe = injectStripe(environment.stripePublicKey);

  elementsOptions: StripeElementsOptions = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    locale: 'en-GB'
  };

  options: StripeExpressCheckoutElementOptions = {
    buttonHeight: 50,
    buttonType: {
      applePay: 'check-out',
      googlePay: 'pay',
    }
  };

  onClicked(event: StripeExpressCheckoutElementClickEvent){
    const { elementType, expressPaymentType, resolve } = event;

    console.log('element type', elementType);
  }
}
