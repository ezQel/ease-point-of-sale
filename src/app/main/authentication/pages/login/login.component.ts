import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginButtonDisabled = false;
  errorMessage?: string | null;

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private auth: AngularFireAuth, private router: Router) {}

  logIn(): void {
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.loginButtonDisabled = true;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.signInWithEmailAndPassword(email, password).then(
      () => {
        this.router.navigateByUrl('/onboarding');
      },
      (error: FirebaseError) => {
        this.loginButtonDisabled = false;

        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          this.errorMessage = 'Invalid email address or password.';
          return;
        }

        this.errorMessage = error.message;
      }
    );
  }
}
