import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { JoinComponent } from './pages/join/join.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { PasswordRecoveryPendingComponent } from './pages/password-recovery-pending/password-recovery-pending.component';
import { JoinUsernameComponent } from './pages/join-username/join-username.component';

@NgModule({
  declarations: [
    LoginComponent,
    JoinComponent,
    PasswordRecoveryComponent,
    EmailVerificationComponent,
    PasswordResetComponent,
    PasswordRecoveryPendingComponent,
    JoinUsernameComponent,
  ],
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule],
})
export class AuthenticationModule {}
