import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/main/products/models/product';
import { AppService } from '../../services/app.service';
import { ProductsAddComponent } from 'src/app/main/products/components/products-add/products-add.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  /**
   * Determines whether the actions dropdown should be shown
   * and if an out of stock product should appear disabled
   */
  @Input() modifiable = false;

  /**
   * The details of the product to be displayed
   */
  @Input() product!: Product;

  /**
   * Whether the product is out of stock
   */
  isOutOfStock!: boolean;

  /**
   * Determines if the product should appear clickable or disabled if it is out of stock
   */
  isDisabled!: boolean;

  /**
   * Whether the product stock has reached the reorder level
   */
  lowStock!: boolean;

  constructor(private ngbModal: NgbModal, private app: AppService) {}

  ngOnInit(): void {
    this.isOutOfStock = this.product.stockSize < 1;
    this.isDisabled = this.isOutOfStock && !this.modifiable;
    this.lowStock =
      this.product.reorderLevel >= this.product.stockSize && !this.isOutOfStock;
  }

  /**
   * Opens a dialog for updating the details of a product
   * @param product The product to be updated
   */
  editProduct(product: Product): void {
    const editModal = this.ngbModal.open(ProductsAddComponent, { size: 'lg' });
    editModal.componentInstance.product = product;
  }

  /**
   * Removes a product from the inventory
   * @param productId The id of the product to eb removed
   */
  deleteProduct(productId: string): void {
    // Open a confirmation modal
    const confirmationModal = this.ngbModal.open(ConfirmationModalComponent);
    confirmationModal.componentInstance.title = 'Delete product?';

    confirmationModal.closed.subscribe(() => {
      // Delete the product if the user confirms deletion
      this.app.getProductsRef()?.doc(productId).delete();
    });
  }
}
