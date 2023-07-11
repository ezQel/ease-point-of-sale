import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as firestore from 'firebase/firestore';
import { Product } from 'src/app/main/products/models/product';
import { Sale } from 'src/app/shared/models/sale';
import { AppService } from 'src/app/shared/services/app.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-confirmation-modal',
  templateUrl: './checkout-confirmation-modal.component.html',
  styleUrls: ['./checkout-confirmation-modal.component.scss'],
})
export class CheckoutConfirmationModalComponent implements OnInit {
  btnDisabled = false;

  /**
   * Error message to be shown to the user in case of any error during checkout
   */
  errorMessage?: string;

  /**
   * Form group for payment method, etc. required from the user
   */
  paymentInfoForm = new FormGroup({
    discount: new FormControl(0),
    paymentMethod: new FormControl('CASH'),
    payment: new FormControl(),
    mPesaCode: new FormControl(''),
  });

  /**
   * Form control for the checkbox whose staus determines if a receipt should be printed after chckout
   */
  printReceipt = new FormControl();

  constructor(
    public modal: NgbActiveModal,
    private app: AppService,
    private cartService: CartService,
    private auth: AngularFireAuth,
    private fs: AngularFirestore
  ) {}

  /**
   * The total amount to be paid after substracting the entered discount
   */
  get total(): number {
    const discount = +(this.paymentInfoForm.get('discount')?.value || 0);
    return this.cartService.total - discount;
  }

  get stockCost(): number {
    return this.cartService.cart.reduce((total, item) => {
      const cost = item.buyingPrice
        ? item.buyingPrice * item.quantity
        : item.totalPrice;

      return total + cost;
    }, 0);
  }

  get change(): number {
    const payment = this.paymentInfoForm.get('payment')?.value;
    return payment ? payment - this.total : 0;
  }

  get paymentMethodIsMpesa(): boolean {
    return this.paymentInfoForm.get('paymentMethod')?.value === 'MPESA';
  }

  ngOnInit(): void {
    this.getPrintingSetting();
  }

  /**
   * Get the printing setting from the shop info to determine whether
   * a sales receipt should be printed after checkout
   */
  getPrintingSetting(): void {
    this.app.getCurrentShop()?.subscribe((shop) => {
      this.printReceipt.setValue(shop?.printReceipt);
    });
  }

  /**
   * Changes the setting for printing receipt on firebase depending on the check box status
   * @param event The 'Print receipt' checkbox's change event
   */
  changePrintSetting(event: Event): void {
    const printReceipt = (<HTMLInputElement>event.target).checked;
    this.app.getCurrentShopRef()?.update({ printReceipt });
  }

  /**
   *
   */
  async checkout(): Promise<void> {
    this.btnDisabled = true;
    let currentUser;

    try {
      const { uid, displayName } = <User>await this.auth.currentUser;
      currentUser = { uid, displayName };
    } catch (error) {
      this.errorMessage = 'Something went wrong!';
      this.btnDisabled = false;
      return;
    }

    const salesRef = this.app.getSalesRef();
    const saleEntryRef = <DocumentReference<Sale>>salesRef?.doc().ref;

    const sale = <Sale>this.paymentInfoForm.value;
    sale.items = this.cartService.cart;
    sale.amount = this.cartService.total;
    sale.paymentMethod = sale.paymentMethod || 'CASH';
    sale.payment = sale.payment || this.total;
    sale.profit = this.total - this.stockCost;
    sale.change = this.change;

    sale.soldBy = currentUser; // Set current user as the seller
    sale.id = <string>saleEntryRef?.id; // Get a document id from firestore
    sale.date = firestore.serverTimestamp(); // Get current timestamp from firestore

    this.fs.firestore
      .runTransaction(async (transaction) => {
        const productsRef = this.app.getProductsRef();
        transaction.set(saleEntryRef, sale);

        // Reduce and update products' stock sizes
        sale?.items?.forEach((item) => {
          const stockSize = item.stockSize - item.quantity;
          const itemRef = <DocumentReference<Product>>(
            productsRef?.doc(item.id).ref
          );

          transaction.update(itemRef, { stockSize });
        });
      })
      .then(
        () => {
          this.cartService.clear();
          this.modal.close({ print: this.printReceipt.value, saleId: sale.id });
        },
        (error) => {
          this.errorMessage = error;
          this.btnDisabled = false;
        }
      );
  }
}
