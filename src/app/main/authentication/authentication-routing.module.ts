import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './pages/join/join.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { PasswordRecoveryPendingComponent } from './pages/password-recovery-pending/password-recovery-pending.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { JoinUsernameComponent } from './pages/join-username/join-username.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'join', component: JoinComponent },
  { path: 'join-username', component: JoinUsernameComponent },
  { path: 'recover-password', component: PasswordRecoveryComponent },
  { path: 'recovery-pending', component: PasswordRecoveryPendingComponent },
  { path: 'reset-password', component: PasswordResetComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
