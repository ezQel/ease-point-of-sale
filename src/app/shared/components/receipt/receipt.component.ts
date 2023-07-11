import { Component, Input, OnInit } from '@angular/core';
import { Sale } from '../../models/sale';
import { Shop } from '../../models/shop';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {
  @Input() shop?: Shop;
  @Input() receipt!: Sale;
  @Input() copy?: boolean;

  constructor(private app: AppService) {}

  ngOnInit(): void {
    this.app.getCurrentShop()?.subscribe((shop) => (this.shop = shop));
  }
}
