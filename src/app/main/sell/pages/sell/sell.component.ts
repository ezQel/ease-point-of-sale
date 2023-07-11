import { Component } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { OrderByDirection } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/main/products/models/product';
import { AppService } from 'src/app/shared/services/app.service';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent {
  orderBy: 'sales' | 'price' | 'stockSize' = 'stockSize';
  orderDirection: OrderByDirection = 'asc';
  view: 'LIST' | 'GRID' = 'GRID';

  products!: MatTableDataSource<Product>;
  search = new FormControl();

  constructor(
    private app: AppService,
    private firestore: AngularFirestore,
    private bottomSheet: MatBottomSheet
  ) {
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
        this.search.valueChanges.subscribe((s) => this.filterProducts(s));
      });
  }

  filterProducts(filter: string): void {
    this.products.filter = filter;
  }

  setOrderBy(orderBy: 'sales' | 'price' | 'stockSize'): void {
    this.orderBy = orderBy;
    this.getProducts();
  }

  setOrderDirection(order: OrderByDirection): void {
    this.orderDirection = order;
    this.getProducts();
  }

  revealCart(): void {
    this.bottomSheet.open(CartComponent);
  }
}
