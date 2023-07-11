import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo('auth/login') },
    component: LayoutComponent,
    children: [
      {
        path: 'insights',
        canActivate: [RoleGuard],
        loadChildren: () =>
          import('./main/insights/insights.module').then(
            (m) => m.InsightsModule
          ),
      },
      {
        path: 'sell',
        loadChildren: () =>
          import('./main/sell/sell.module').then((m) => m.SellModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./main/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./main/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'sales-history',
        loadChildren: () =>
          import('./main/sales-history/sales-history.module').then(
            (m) => m.SalesHistoryModule
          ),
      },
      {
        path: '',
        redirectTo: 'insights',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['insights']) },
    loadChildren: () =>
      import('./main/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./main/onboarding/onboarding.module').then(
        (m) => m.OnboardingModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
