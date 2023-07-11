import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent {
  buttonDisabled = false;
  errorMessage?: string | null;

  joinForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    repeatPassword: new FormControl(),
  });

  constructor(private auth: AngularFireAuth, private router: Router) {}

  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;

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

  signUp(): void {
    this.errorMessage = null;

    const { email, password, repeatPassword } = this.joinForm.value;

    if (!email || !password || !repeatPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.joinForm.getError('passwords')) {
      this.errorMessage = this.joinForm.getError('passwords');
      return;
    }

    if (password.length < 8) {
      this.errorMessage =
        'The password must be at least 8 characters in length';
      return;
    }

    this.auth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.router.navigate(['/auth/join-username']);
      },
      (error: FirebaseError) => {
        if (error.code === 'auth/weak-password') {
          this.errorMessage = 'The password is too weak.';
          return;
        }

        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = 'The email provided is already in use.';
          return;
        }

        this.errorMessage = 'Something went wrong. Please try again.';
      }
    );
  }
}
