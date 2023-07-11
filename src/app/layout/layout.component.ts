import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { Observable, map } from 'rxjs';
import { AppService } from '../shared/services/app.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  admins$!: Observable<string[] | undefined>;
  user$!: Observable<UserInfo | null>;

  constructor(private app: AppService, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.getAdmins();
    this.getUser();
  }

  getUser(): void {
    this.user$ = this.auth.user;
  }

  getAdmins(): void {
    this.admins$ = this.app.getCurrentShop().pipe(map((shop) => shop?.admins));
  }
}
