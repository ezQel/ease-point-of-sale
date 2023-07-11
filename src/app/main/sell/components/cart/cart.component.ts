import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/main/products/models/product';
import { Sale } from 'src/app/shared/models/sale';
import { AppService } from 'src/app/shared/services/app.service';
import { PrinterService } from '../../../../shared/services/printer.service';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { CheckoutConfirmationModalComponent } from '../checkout-confirmation-modal/checkout-confirmation-modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  receipt?: Sale;

  constructor(
    private cartService: CartService,
    private ngbModal: NgbModal,
    private app: AppService,
    private printer: PrinterService
  ) {}

  get cart(): Array<CartItem> {
    return this.cartService.cart;
  }

  get total(): number {
    return this.cartService.total;
  }

  get size(): number {
    return this.cartService.size;
  }

  add(product: Product): void {
    this.cartService.add(product);
  }

  clear(): void {
    this.cartService.clear();
  }

  checkout(): void {
    const modal = this.ngbModal.open(CheckoutConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
    });

    modal.closed.subscribe((result) => {
      if (result.print) {
        this.app
          .getSalesRef()
          ?.doc(result.saleId)
          .get()
          .subscribe((snapShot) => {
            this.receipt = snapShot.data();
            this.printer.print('sales-receipt');
          });
      }
    });
  }
}
