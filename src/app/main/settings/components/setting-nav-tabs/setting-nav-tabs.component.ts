import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-setting-nav-tabs',
  templateUrl: './setting-nav-tabs.component.html',
  styleUrls: ['./setting-nav-tabs.component.scss'],
})
export class SettingNavTabsComponent implements OnInit {
  user$!: Observable<UserInfo | null>;
  admins$!: Observable<string[] | undefined>;

  constructor(private app: AppService, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.getUser();
    this.getAdmins();
  }

  getUser(): void {
    this.user$ = this.auth.user;
  }

  getAdmins(): void {
    this.admins$ = this.app.getCurrentShop().pipe(map((shop) => shop?.admins));
  }
}
