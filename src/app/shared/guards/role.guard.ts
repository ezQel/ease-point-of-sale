import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, UrlTree } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(
    private app: AppService,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const user$ = this.auth.user;
    const shop$ = this.app.getCurrentShop();

    return user$.pipe(
      mergeMap((user) =>
        shop$.pipe(
          map((shop) => {
            if (shop && user && user.email) {
              const isAdmin = shop.admins.includes(user.email);
              return isAdmin || this.router.createUrlTree(['/sell']);
            }

            return this.router.createUrlTree(['/sell']);
          })
        )
      )
    );
  }
}
