import { Component } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Period } from 'src/app/shared/models/period';
import { Sale } from 'src/app/shared/models/sale';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  isCollapsed = true;
  salesHistory$?: Observable<Sale[]>;

  constructor(private app: AppService) {}

  /**
   * Gets a list of sales that occured within the specified perios
   * @param period The period for which to query the sales
   */
  getSalesHistory(period: Period): void {
    const filterByPeriod: QueryFn = (ref) => {
      return ref
        .where('date', '>=', period.start)
        .where('date', '<=', period.end)
        .orderBy('date', 'desc');
    };

    this.salesHistory$ = this.app.getSalesRef(filterByPeriod)?.valueChanges();
  }
}
