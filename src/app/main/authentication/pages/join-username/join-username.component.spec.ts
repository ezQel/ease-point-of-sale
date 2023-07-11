import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinUsernameComponent } from './join-username.component';

describe('JoinUsernameComponent', () => {
  let component: JoinUsernameComponent;
  let fixture: ComponentFixture<JoinUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinUsernameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
