import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;

  constructor(private cartService: CartService) {}

  setQuantity(cartItem: CartItem, inputEvent: Event | { target: any }): void {
    this.cartService.setQuantity(cartItem, inputEvent);
  }

  remove(id: string): void {
    this.cartService.remove(id);
  }
}
