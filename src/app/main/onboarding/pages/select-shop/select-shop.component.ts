import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Shop } from 'src/app/shared/models/shop';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-select-shop',
  templateUrl: './select-shop.component.html',
  styleUrls: ['./select-shop.component.scss'],
})
export class SelectShopComponent {
  shops?: Shop[];

  constructor(private router: Router, private app: AppService) {
    this.getShops();
  }

  /**
   * Gets a list of shops that the user is allowed to access
   */
  getShops(): void {
    this.app.getShops().subscribe((shops) => {
      if (shops?.length === 1) {
        this.selectShop(shops[0]);
        return;
      }

      this.shops = shops;
    });
  }

  selectShop(shop: Shop): void {
    this.app.setCurrentShopId(shop.id);
    this.router.navigateByUrl('/insights');
  }
}
