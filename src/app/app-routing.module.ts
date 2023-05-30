import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ProductComponent } from './product/product.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'cart', component: CartComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'payment', component: PaymentFormComponent},
  { path: 'register', component: RegistrationFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
