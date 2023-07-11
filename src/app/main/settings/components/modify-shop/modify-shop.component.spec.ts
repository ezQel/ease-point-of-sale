import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyShopComponent } from './modify-shop.component';

describe('ModifyCompanyComponent', () => {
  let component: ModifyShopComponent;
  let fixture: ComponentFixture<ModifyShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
