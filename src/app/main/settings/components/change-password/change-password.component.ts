import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  buttonDisabled = false;
  requiresRecentLogin = false;
  errorMessage?: string | null;
  private _destroy = new Subject<void>();
  user?: firebase.default.User | null;

  passwordsForm = new FormGroup({
    password: new FormControl(),
    repeatPassword: new FormControl(),
  });

  constructor(
    private auth: AngularFireAuth,
    public modal: NgbActiveModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passwordsForm.addValidators(this.passwordsMatch);
    this.getUser();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  getUser(): void {
    this.auth.user.pipe(takeUntil(this._destroy)).subscribe((user) => {
      this.user = user;
    });
  }

  /**
   * Logs out the user and navigates them to the login page
   */
  goToLogin(): void {
    this.modal.close();
    this.auth.signOut().then(() => this.router.navigateByUrl('/auth/login'));
  }

  /**
   * Makes sure that the password and repeated password are the same
   */
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

  /**
   * Updates the users passwords on firebase
   */
  updatePassword(): void {
    this.errorMessage = null; // Clear any previous error message

    if (this.passwordsForm.invalid) {
      this.errorMessage = '* Both fields are required';
      return;
    }

    if (!this.user) {
      this.errorMessage = 'User not found';
      return;
    }

    this.buttonDisabled = true;
    const password = this.passwordsForm.get('password')?.value;

    this.user?.updatePassword(password).then(
      () => {
        this.modal.close();
      },
      (error) => {
        if (error.code === 'auth/requires-recent-login') {
          this.requiresRecentLogin = true;
          this.errorMessage =
            'You need to have logged in recently to change your password.';
          return;
        }

        this.errorMessage = error;
        this.buttonDisabled = false;
      }
    );
  }
}
