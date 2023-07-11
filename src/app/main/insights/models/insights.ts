import { Sale } from 'src/app/shared/models/sale';

export class Insight {
  totalSales = 0;
  totalProfit = 0;
  totalDiscounts = 0;
  sales!: Sale[];

  constructor(sales: Sale[]) {
    this.createInsights(sales);
  }

  private createInsights(sales: Sale[]): void {
    sales = sales.filter((sale) => !(sale.refunded || sale.returned)); // Filter out refunded sales
    this.sales = sales;

    sales.forEach((sale) => {
      this.totalSales += sale.amount - sale.discount;
      this.totalProfit += sale.profit || 0;
      this.totalDiscounts += sale.discount || 0;
    });
  }
}
