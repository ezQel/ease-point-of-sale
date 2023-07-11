import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Shop } from '../../models/shop';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  user$?: Observable<UserInfo | null>;
  shop$?: Observable<Shop | undefined>;
  allowedToSwitchShops$?: Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private app: AppService
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.user;
    this.shop$ = this.app.getCurrentShop();

    this.allowedToSwitchShops$ = this.app
      .getShops()
      .pipe(map((shops) => shops?.length > 1));
  }

  logOut(): void {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
