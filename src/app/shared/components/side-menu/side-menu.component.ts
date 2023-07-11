import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AppService } from '../../services/app.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserInfo } from '@angular/fire/auth';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
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
