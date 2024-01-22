import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/main/app.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { reducers } from './reducers/product.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './effects/product.effects';
import { CartComponent } from './components/cart/cart.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { MaterialModule } from './material.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxStripeModule } from 'ngx-stripe';
import { StripeDialogComponent } from './components/stripe-dialog/stripe-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    PaymentFormComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    StripeDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([ProductEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    connectInZone: true}),
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.stripePublicKey, {
      apiVersion: environment.stripeApiVersion,
    }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
