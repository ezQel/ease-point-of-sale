import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/shared/models/shop';
import { AppService } from 'src/app/shared/services/app.service';
import { ModifyShopComponent } from '../../components/modify-shop/modify-shop.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserInfo } from '@angular/fire/auth';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  shop$?: Observable<Shop | undefined>;
  user$?: Observable<UserInfo | null>;

  constructor(
    private app: AppService,
    private modal: NgbModal,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.shop$ = this.app.getCurrentShop();
    this.getUser();
  }

  getUser(): void {
    this.user$ = this.auth.user;
  }

  editShopInfo(): void {
    this.modal.open(ModifyShopComponent, { size: 'lg' });
  }
}
