import { Pipe, PipeTransform } from '@angular/core';
import { Sale } from 'src/app/shared/models/sale';

@Pipe({
  name: 'salesTotal',
})
export class SalesTotalPipe implements PipeTransform {
  transform(sales: Sale[]): number {
    return sales.reduce((total, sale) => {
      if (sale.refunded || sale.returned) {
        return total;
      }

      const amount = sale.amount - sale.discount;
      return total + amount;
    }, 0);
  }
}
