import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReturnConfirmationComponent } from './components/return-confirmation/return-confirmation.component';
import { HistoryComponent } from './pages/history/history.component';
import { SalesHistoryRoutingModule } from './sales-history-routing.module';
import { HistorySaleItemComponent } from './components/history-sale/history-sale.component';
import { HistoryPrintoutComponent } from './components/history-printout/history-printout.component';
import { SalesTotalPipe } from './pipes/sales-total.pipe';

@NgModule({
  declarations: [HistoryComponent, ReturnConfirmationComponent, HistorySaleItemComponent, HistoryPrintoutComponent, SalesTotalPipe],
  imports: [
    CommonModule,
    SalesHistoryRoutingModule,
    SharedModule,
    NativeDateModule,
    MatDatepickerModule,
  ],
})
export class SalesHistoryModule {}
