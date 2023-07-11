import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.scss'],
})
export class ChangeNameComponent implements OnInit, OnDestroy {
  errorMessage?: string | null;
  name = new FormControl();
  private _destroy = new Subject<void>();
  user?: firebase.default.User | null;

  constructor(private auth: AngularFireAuth, public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.prefillName();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  prefillName(): void {
    this.auth.user.pipe(takeUntil(this._destroy)).subscribe((user) => {
      this.user = user;
      this.name.setValue(user?.displayName);
    });
  }

  /**
   * Updates the users displayName on firebase
   */
  updateName(): void {
    this.errorMessage = null; // Clear any previous error message

    if (this.name.invalid) {
      this.errorMessage = 'Name is required';
      return;
    }

    if (!this.user) {
      this.errorMessage = 'User not found';
      return;
    }

    const displayName = this.name?.value;

    this.user
      .updateProfile({ displayName })
      .then(() => this.modal.close())
      .catch((error) => (this.errorMessage = error.message));
  }
}
