import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRoutingModule } from './sell-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SellComponent } from './pages/sell/sell.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CartService } from './services/cart.service';
import { CheckoutConfirmationModalComponent } from './components/checkout-confirmation-modal/checkout-confirmation-modal.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@NgModule({
  declarations: [SellComponent, CartComponent, CheckoutConfirmationModalComponent, CartItemComponent],
  imports: [
    CommonModule,
    SellRoutingModule,
    SharedModule,
    MatBottomSheetModule,
  ],
  providers: [CartService]
})
export class SellModule {}
