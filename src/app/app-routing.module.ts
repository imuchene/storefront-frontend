import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ProductComponent } from './components/product/product.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'payment', component: PaymentFormComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
