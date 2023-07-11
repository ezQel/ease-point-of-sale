import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  errorMessage?: string | null;

  passwordForm = new FormGroup({
    password: new FormControl(),
    repeatPassword: new FormControl(),
  });

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.passwordForm.addValidators(this.passwordsMatch);
  }

  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const { password, repeatPassword } = control.value;

    if (!password || !repeatPassword) {
      return null;
    }

    if (password !== repeatPassword) {
      return {
        passwords: "* Passwords don't match",
      };
    }

    return null;
  }

  resetPassword(): void {
    this.errorMessage = null;

    const { password, repeatPassword } = this.passwordForm.value;

    if (!password || !repeatPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.passwordForm.getError('passwords')) {
      this.errorMessage = this.passwordForm.getError('passwords');
      return;
    }

    if (password.length < 8) {
      this.errorMessage =
        'The password must be at least 8 characters in length';
      return;
    }

    const code = this.route.snapshot.queryParams['oobCode'];
    this.auth
      .confirmPasswordReset(code, password)
      .then(() => this.router.navigateByUrl('/auth/login'))
      .catch((error: FirebaseError) => {
        if (error.code === 'auth/expired-action-code') {
          this.errorMessage = 'The reset email has expired';
          return;
        }

        this.errorMessage = error.message;
      });
  }
}
