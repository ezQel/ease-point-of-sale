import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
import { Product } from 'src/app/main/products/models/product';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Sale } from '../models/sale';
import { Shop } from '../models/shop';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  /**
   * Live Observable of the current shop's info to be shared across the app
   */
  private shop$?: Observable<Shop | undefined>;

  /**
   * An observable of all shops accessible to the user
   */
  private shops$?: Observable<Shop[]>;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  getShops(): Observable<Shop[]> {
    if (!this.shops$) {
      this.shops$ = this.auth.user.pipe(
        mergeMap((user) => {
          return this.firestore
            .collection<Shop>('companies', (ref) =>
              ref.where('employees', 'array-contains', user?.email)
            )
            .get();
        }),
        map((snapShot) => snapShot.docs.map((d) => d.data()))
      );
    }

    return this.shops$;
  }

  getCurrentShop(): Observable<Shop | undefined> {
    if (!this.shop$) {
      this.shop$ = this.getCurrentShopRef()?.valueChanges();
    }

    return this.shop$;
  }

  setCurrentShopId(shopId: string): void {
    localStorage.setItem(StorageKeys.SHOP_ID, shopId);
    this.shop$ = undefined;
  }

  getCurrentShopId(): string | null {
    const shopId = localStorage.getItem(StorageKeys.SHOP_ID);

    if (!shopId) {
      this.router.navigate(['/onboarding']);
      return null;
    }

    return shopId;
  }

  getCurrentShopRef(): AngularFirestoreDocument<Shop> {
    const shopId = this.getCurrentShopId();

    if (!shopId) {
      throw new Error('Shop id not found');
    }

    return this.firestore.collection('companies').doc<Shop>(shopId);
  }

  /**
   * Gets a reference to the current shops's products' collection on firestore
   * @param queryFn A query function that will be passed to the collection
   * @returns An reference to the products collection
   */
  getProductsRef(
    queryFn?: QueryFn
  ): AngularFirestoreCollection<Product> | undefined {
    const shopId = this.getCurrentShopId();

    if (!shopId) {
      return;
    }

    return this.getCurrentShopRef()?.collection<Product>('products', queryFn);
  }

  /**
   * Gets a reference to the current shop's sales' collection on firestore
   * @param queryFn A query function that will be passed to the collection
   * @returns An reference to the sales collection
   */
  getSalesRef(queryFn?: QueryFn): AngularFirestoreCollection<Sale> | undefined {
    const shopId = this.getCurrentShopId();

    if (!shopId) {
      return;
    }

    return this.getCurrentShopRef()?.collection<Sale>('sales', queryFn);
  }
}
