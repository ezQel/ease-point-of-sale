import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-recovery-pending',
  templateUrl: './password-recovery-pending.component.html',
  styleUrls: ['./password-recovery-pending.component.scss'],
})
export class PasswordRecoveryPendingComponent implements OnInit {
  email?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
  }
}
