import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPrintoutComponent } from './history-printout.component';

describe('HistoryPrintoutComponent', () => {
  let component: HistoryPrintoutComponent;
  let fixture: ComponentFixture<HistoryPrintoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPrintoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPrintoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
