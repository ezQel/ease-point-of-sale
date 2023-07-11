import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutConfirmationModalComponent } from './checkout-confirmation-modal.component';

describe('CheckoutConfirmationModalComponent', () => {
  let component: CheckoutConfirmationModalComponent;
  let fixture: ComponentFixture<CheckoutConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutConfirmationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
