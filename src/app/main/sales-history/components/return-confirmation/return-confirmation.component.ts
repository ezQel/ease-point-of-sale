import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/main/products/models/product';
import { Sale } from 'src/app/shared/models/sale';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-return-confirmation',
  templateUrl: './return-confirmation.component.html',
  styleUrls: ['./return-confirmation.component.scss'],
})
export class ReturnConfirmationComponent {
  btnDisabled = false;

  /**
   * The sale with the returned items
   */
  @Input() sale!: Sale;

  /**
   * Any error that might occur during updating of product stocks
   */
  errorMessage?: string;

  constructor(
    public modal: NgbActiveModal,
    private app: AppService,
    private fs: AngularFirestore
  ) {}

  /**
   * Updates the sale's 'returned' status to true and increases returned products' stock
   */
  returnGoods(): void {
    /**
     * Default message to be shown to the user in casees where the encountered error is technical
     */
    const defaultErrorMessage = 'Something went wrong. Please retry.';

    const productsRef = this.app.getProductsRef();
    const salesRef = this.app.getSalesRef();

    if (!productsRef || !salesRef) {
      // Stop execution and show error if references to products or sales collections are undefuned
      this.errorMessage = defaultErrorMessage;
      return;
    }

    this.btnDisabled = true;

    // Use a transaction for acidity
    this.fs.firestore
      .runTransaction(async (transaction) => {
        const saleDocRef = salesRef?.doc(this.sale?.id).ref;
        const sale = (await transaction.get(saleDocRef)).data();

        if (!sale) {
          // Stop execution and show defaut error message and if the sale is undefined
          throw defaultErrorMessage;
        }

        if (sale.returned || sale.refunded) {
          // close the modal and stop execution if the sale has already returned
          this.modal.close();
          return;
        }

        const products = []; // Array of updated stock sizes and product document refreences

        // Loop through products in the sale to get their current details
        for (const product of sale.items) {
          const productRef = productsRef.doc(product.id).ref;
          const productSnapshot = await transaction.get(productRef);

          if (!productSnapshot.exists) {
            // Show error message to the user if the product was deleted
            throw `'${product.name}' cannot be returned because it is no longer in your inventory`;
          }

          const productData = <Product>productSnapshot.data();

          // Sum the product's stock size and the number of returned items to get the new stock size
          const stockSize = productData.stockSize + product.quantity;

          products.push({ stockSize, ref: productRef });
        }

        products.forEach((product) => {
          // Update stock sizes of all the products
          transaction.update(product.ref, { stockSize: product.stockSize });
        });

        // update the sale to 'returned' state
        transaction.update(saleDocRef, { returned: true });
      })
      .then(
        () => {
          this.modal.close();
        },
        (error) => {
          this.errorMessage = error;
          this.btnDisabled = false;
        }
      );
  }
}
