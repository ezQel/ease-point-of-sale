import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sale } from 'src/app/shared/models/sale';
import { ReturnConfirmationComponent } from '../return-confirmation/return-confirmation.component';

@Component({
  selector: 'app-history-sale',
  templateUrl: './history-sale.component.html',
  styleUrls: ['./history-sale.component.scss'],
})
export class HistorySaleItemComponent implements OnInit {
  @Input() sale!: Sale;
  isReturned!: boolean;

  constructor(private ngbModal: NgbModal) {}

  ngOnInit(): void {
    this.isReturned = this.sale.returned || this.sale.refunded;
  }

  returnProducts(sale: Sale): void {
    const modal = this.ngbModal.open(ReturnConfirmationComponent);
    modal.componentInstance.sale = sale;
  }
}
