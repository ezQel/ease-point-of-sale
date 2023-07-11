import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { ChangeNameComponent } from '../../components/change-name/change-name.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$?: Observable<UserInfo | null>;

  constructor(private auth: AngularFireAuth, private modal: NgbModal) {}

  ngOnInit(): void {
    this.user$ = this.auth.user;
  }

  changeName(): void {
    this.modal.open(ChangeNameComponent);
  }

  changePassword(): void {
    this.modal.open(ChangePasswordComponent);
  }
}
