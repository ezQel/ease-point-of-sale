import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { AddShopComponent } from './pages/add-shop/add-shop.component';
import { SelectShopComponent } from './pages/select-shop/select-shop.component';


@NgModule({
  declarations: [
    SelectShopComponent,
    AddShopComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    ReactiveFormsModule
  ]
})
export class OnboardingModule { }
