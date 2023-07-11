import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingNavTabsComponent } from './components/setting-nav-tabs/setting-nav-tabs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShopComponent } from './pages/shop/shop.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { EmployeesComponent } from './pages/employees/employees.component';

const routes: Routes = [
  {
    path: '',
    component: SettingNavTabsComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'prefrences', component: PreferencesComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
