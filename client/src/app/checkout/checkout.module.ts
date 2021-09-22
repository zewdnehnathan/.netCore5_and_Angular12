import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
  CheckoutRoutingModule ]
})
export class CheckoutModule { }
