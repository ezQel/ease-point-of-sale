import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent {
  errorMessage?: string | null;
  emailForm = new FormGroup({
    email: new FormControl(),
  });

  constructor(private auth: AngularFireAuth, private router: Router) {}

  sendRecoveryEmail(): void {
    if (this.emailForm.invalid) {
      this.errorMessage = 'Your email is required';
      return;
    }

    this.errorMessage = null;
    const email = this.emailForm.value.email;

    this.auth
      .sendPasswordResetEmail(email)
      .then(() =>
        this.router.navigate(['/auth/recovery-pending'], {
          queryParams: { email },
        })
      )
      .catch((error) => (this.errorMessage = error));
  }
}
