import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SettingNavTabsComponent } from './components/setting-nav-tabs/setting-nav-tabs.component';
import { ShopComponent } from './pages/shop/shop.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeNameComponent } from './components/change-name/change-name.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModifyShopComponent } from './components/modify-shop/modify-shop.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ShopComponent,
    PreferencesComponent,
    SettingNavTabsComponent,
    ChangePasswordComponent,
    ChangeNameComponent,
    ModifyShopComponent,
    EmployeesComponent,
    AddEmployeeComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, SharedModule],
})
export class SettingsModule {}
