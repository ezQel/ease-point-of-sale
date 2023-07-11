import { Injectable } from '@angular/core';
import { Product } from '../../products/models/product';
import { CartItem } from '../models/cart-item';

@Injectable()
export class CartService {
  /**
   * Cart items mapped to their ids
   */
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.cartItems = new Map();
  }

  /**
   * An array of the items in the cart
   */
  get cart(): Array<CartItem> {
    return Array.from(this.cartItems.values());
  }

  /**
   * The total price of the cart
   */
  get total(): number {
    return this.cart.reduce((total, item) => total + item.totalPrice, 0);
  }

  get size(): number {
    return this.cart.length;
  }

  /**
   * Adds a product to the cart or increases its quantity if it already exists
   * @param product The product to be added to the cart
   * @param quantity The quantity of the product
   */
  add(product: Product): void {
    if (product.stockSize === 0) {
      // Do not add a product that is out of stock therefore exit the funtion
      return;
    }

    // Check if the product is already in the cart
    let cartItem = this.cartItems.get(product.id);

    if (cartItem) {
      // Increase the quantity if the product is in the cart and exit the function
      this.increaseQuantity(cartItem);
      return;
    }

    // Create new cart item with the product if it is not in the cart
    cartItem = { quantity: 1, ...product, totalPrice: product.price };
    this.cartItems.set(product.id, cartItem);
  }

  /**
   * Increases a cart items quantity
   * @param cartItem The cart item whose quantity is to be increased
   */
  increaseQuantity(cartItem: CartItem): void {
    if (cartItem.quantity < cartItem.stockSize) {
      // Increase the quantity by one only if there is available stock
      cartItem.quantity += 1;

      // Calculate and set the new total price
      cartItem.totalPrice = cartItem.quantity * cartItem.price;
    }
  }

  /**
   * Sets the quantity of a cartItem
   * @param cartItem The cart item whose quantity is to be set
   * @param inputEvent The input event
   */
  setQuantity(cartItem: CartItem, inputEvent: Event | { target: any }): void {
    let quantity = +inputEvent?.target?.value; // get input value

    if (quantity < 1 || !quantity) {
      // set the quantity to one if the user enters a value below 1 or no value at all
      quantity = 1;
      inputEvent.target.value = quantity;
    } else if (quantity > cartItem.stockSize) {
      // set the quantity to the available stock size if the user enters a value above the stock size
      quantity = cartItem.stockSize;
      inputEvent.target.value = quantity;
    }

    // Increase the quantity by one or set it to the specified quantity if quantity is specified
    cartItem.quantity = quantity;

    // Calculate the new total price
    cartItem.totalPrice = cartItem.quantity * cartItem.price;
  }

  /**
   * Remove product with specified id from the cart
   * @param id The id of the product to be removed
   */
  remove(id: string): void {
    this.cartItems.delete(id);
  }

  clear(): void {
    this.cartItems.clear();
  }
}
