import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySaleItemComponent } from './history-sale.component';

describe('HistorySaleItemComponent', () => {
  let component: HistorySaleItemComponent;
  let fixture: ComponentFixture<HistorySaleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySaleItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySaleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
