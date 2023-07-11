import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { InsightsRoutingModule } from './insights-routing.module';
import { InsightsComponent } from './pages/insights/insights.component';

@NgModule({
  declarations: [InsightsComponent],
  imports: [CommonModule, InsightsRoutingModule, SharedModule],
})
export class InsightsModule {}
