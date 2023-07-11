import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectShopComponent } from './pages/select-shop/select-shop.component';
import { AddShopComponent } from './pages/add-shop/add-shop.component';

const routes: Routes = [
  { path: 'select-shop', component: SelectShopComponent },
  { path: 'add-shop', component: AddShopComponent },
  { path: '', redirectTo: 'select-shop', pathMatch: 'full' },
  { path: '**', redirectTo: 'select-shop', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
