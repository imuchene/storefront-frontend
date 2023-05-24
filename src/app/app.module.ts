import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { reducers } from './reducers/product.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './effects/product.effects';
import { CartComponent } from './cart/cart.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { MaterialModule } from './material.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxStripeModule } from 'ngx-stripe';
import { StripeDialogComponent } from './stripe-dialog/stripe-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    PaymentFormComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    StripeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([ProductEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51JNFj6GIyORaO7x3u4vzlVQJh4VdrlQa45nQVdVV8GCftT6TWYyuUG8xhD72TN6zdnwTpnJq3FZwz3FN41436Wlp009CDJriWG', { apiVersion: '2022-11-15'})
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
