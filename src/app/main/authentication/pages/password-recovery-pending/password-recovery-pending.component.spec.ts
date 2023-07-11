import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryPendingComponent } from './password-recovery-pending.component';

describe('PasswordRecoveryPendingComponent', () => {
  let component: PasswordRecoveryPendingComponent;
  let fixture: ComponentFixture<PasswordRecoveryPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRecoveryPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
