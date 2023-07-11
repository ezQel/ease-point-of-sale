import { Component } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { OrderByDirection } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { AppService } from 'src/app/shared/services/app.service';
import { ProductsAddComponent } from '../../components/products-add/products-add.component';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  orderBy: 'sales' | 'price' | 'stockSize' = 'stockSize';
  orderDirection: OrderByDirection = 'asc';
  view: 'LIST' | 'GRID' = 'GRID';

  products!: MatTableDataSource<Product>;
  stockCost!: number;
  stockValue!: number;

  search = new FormControl();

  constructor(private ngbModal: NgbModal, private app: AppService) {
    this.getProducts();
  }

  /**
   * Gets a list of all products and sets them as the data source data
   */
  getProducts(): void {
    const queryFn: QueryFn = (ref) =>
      ref.orderBy(this.orderBy, this.orderDirection); // Set how the products should be ordered

    this.app
      .getProductsRef(queryFn)
      ?.valueChanges()
      .subscribe((products) => {
        this.products = new MatTableDataSource(products);
        this.stockCost = this.getStockCost(products);
        this.stockValue = this.getStockValue(products);
        this.search.valueChanges.subscribe((s) => this.filterProducts(s));
      });
  }

  filterProducts(filter: string): void {
    this.products.filter = filter;
  }

  /**
   * Calculates and returns the total buying price of all products
   * @returns The total buying price
   */
  getStockCost(products: Product[]): number {
    return products.reduce(
      (total, product) => total + (product.buyingPrice || product.price),
      0
    );
  }

  /**
   * Calculates and returns the total selling price of all products
   * @returns The total selling price
   */
  getStockValue(products: Product[]): number {
    return products.reduce((total, product) => total + product.price, 0);
  }

  /**
   * Sets how the property by which the products should be ordered
   * @param orderBy The ordering property
   */
  setOrderBy(orderBy: 'sales' | 'price' | 'stockSize'): void {
    this.orderBy = orderBy;
    this.getProducts();
  }

  /**
   * Changes the directionin whicn the products are orderes
   * @param order The order direction (Ascending or Descending)
   */
  setOrderDirection(order: OrderByDirection): void {
    this.orderDirection = order;
    this.getProducts();
  }

  /**
   * Opens a dialog for adding a new product
   */
  addProduct(): void {
    this.ngbModal.open(ProductsAddComponent, { size: 'lg' });
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
