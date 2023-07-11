import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/shared/services/app.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss'],
})
export class ProductsAddComponent implements OnInit {
  buttonDisabled = false;

  /**
   * Message to be shown to the user in case of failure in updating or adding a product
   */
  errorMessage?: string;

  /**
   * Product to be updated set if we are updating a product
   */
  product?: Product;

  /**
   * Form with product details
   */
  productForm = new FormGroup({
    description: new FormControl(),
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    buyingPrice: new FormControl(),
    stockSize: new FormControl(),
    taxRate: new FormControl(),
    reorderLevel: new FormControl(),
  });

  constructor(public modal: NgbActiveModal, private app: AppService) {}

  ngOnInit(): void {
    if (this.product) {
      /**
       * Prefill form with product details if we are updating a product
       */
      this.productForm.patchValue(this.product);
    }
  }

  /**
   * Adds or updates a products depending on the condition
   */
  saveProduct(): void {
    this.buttonDisabled = true;

    if (this.product) {
      // Update if it is an existing product
      this.updateProduct();
      return;
    }

    this.addProduct();
  }

  addProduct(): void {
    this.checkValidity();

    const productsRef = this.app.getProductsRef();
    const docRef = productsRef?.doc();
    const product = this.productForm.value;
    product.id = docRef?.ref.id;

    docRef
      ?.set(<Product>product)
      .then(() => {
        this.modal.close();
      })
      .catch((error) => {
        this.errorMessage = error;
        this.buttonDisabled = false;
      });
  }

  updateProduct(): void {
    this.checkValidity();

    const docRef = this.app.getProductsRef()?.doc(this.product?.id);
    const product = this.productForm.value;

    docRef?.update(product).then(
      () => {
        this.modal.close();
      },
      (reason) => {
        this.errorMessage = reason;
        this.buttonDisabled = false;
      }
    );
  }

  checkValidity(): void {
    if (this.productForm.invalid) {
      this.errorMessage = 'All fields are required';
      throw new Error(this.errorMessage);
    }
  }
}
