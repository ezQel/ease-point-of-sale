import { Component } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { Observable, map, tap } from 'rxjs';
import { CartItem } from 'src/app/main/sell/models/cart-item';
import { Period } from 'src/app/shared/models/period';
import { AppService } from 'src/app/shared/services/app.service';
import { Insight } from '../../models/insights';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss'],
})
export class InsightsComponent {
  insights$?: Observable<Insight>;
  products?: CartItem[];

  constructor(private app: AppService) {}

  getInsights(period: Period): void {
    const queryFn: QueryFn = (ref) => {
      return ref
        .where('date', '>=', period.start)
        .where('date', '<=', period.end)
        .orderBy('date', 'desc');
    };

    this.insights$ = this.app
      .getSalesRef(queryFn)
      ?.valueChanges()
      .pipe(
        map((sales) => {
          return new Insight(sales);
        }),
        tap((insight) => this.getProducts(insight))
      );
  }

  getProducts(insight: Insight): void {
    const products = new Map<string, CartItem>();

    for (const sale of insight.sales) {
      sale.items.forEach((item) => {
        const product = products.get(item.id);

        if (product) {
          product.quantity += item.quantity;
          return;
        }

        products.set(item.id, item);
      });
    }

    this.products = Array.from(products.values());
  }
}
