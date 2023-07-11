import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { PeriodComponent } from './components/period/period.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { OptionsComponent } from './components/options/options.component';
import { OptionComponent } from './components/option/option.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ProductComponent } from './components/product/product.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { PrintDirective } from './directives/print.directive';

@NgModule({
  declarations: [
    BottomMenuComponent,
    ProfileCardComponent,
    SideMenuComponent,
    TopBarComponent,
    PeriodComponent,
    LoadingSpinnerComponent,
    OptionsComponent,
    OptionComponent,
    ConfirmationModalComponent,
    ProductComponent,
    ReceiptComponent,

    PrintDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    SideMenuComponent,
    BottomMenuComponent,
    TopBarComponent,
    PeriodComponent,
    LoadingSpinnerComponent,
    OptionsComponent,
    OptionComponent,
    ProductComponent,
    ReceiptComponent,

    PrintDirective,

    NgbDropdownModule,
    NgbModalModule,
    NgbCollapseModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
