import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-modify-shop',
  templateUrl: './modify-shop.component.html',
  styleUrls: ['./modify-shop.component.scss'],
})
export class ModifyShopComponent implements OnInit {
  errorMessage?: string | null;

  shopForm = new FormGroup({
    name: new FormControl(),
    phoneNumber: new FormControl(),
    postalAddress: new FormControl(),
    pinNumber: new FormControl(),
    discount: new FormControl('AMOUNT'),
  });

  constructor(private app: AppService, public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.getShop();
  }

  getShop(): void {
    this.app
      .getCurrentShopRef()
      ?.get()
      .subscribe((shopSnapshot) => {
        const shop = shopSnapshot.data();

        if (shop) {
          this.shopForm.patchValue(shop);
        }
      });
  }

  updateShop(): void {
    this.errorMessage = null;

    const shop = this.shopForm.value;

    if (!shop.name) {
      this.errorMessage = 'The shop name is cannot be empty';
      return;
    }

    this.app
      .getCurrentShopRef()
      ?.update(shop)
      .then(() => this.modal.close())
      .catch((error) => (this.errorMessage = error));
  }
}
