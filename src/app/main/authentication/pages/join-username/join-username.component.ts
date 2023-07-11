import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-username',
  templateUrl: './join-username.component.html',
  styleUrls: ['./join-username.component.scss'],
})
export class JoinUsernameComponent {
  buttonDisabled = false;
  errorMessage?: string | null;

  userForm = new FormGroup({
    displayName: new FormControl(),
  });

  constructor(private auth: AngularFireAuth, private router: Router) {}

  saveUsername(): void {
    this.errorMessage = null;
    const profile = this.userForm.value;

    if (!profile.displayName) {
      this.errorMessage = 'Enter your name to continue';
      return;
    }

    const sub = this.auth.user.subscribe((user) => {
      user?.updateProfile(profile).then(
        () => {
          this.router.navigate(['/onboarding/select-shop']);
        },
        () => {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      );
    });

    sub.unsubscribe();
  }
}
