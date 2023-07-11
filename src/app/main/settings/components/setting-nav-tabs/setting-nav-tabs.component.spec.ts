import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingNavTabsComponent } from './setting-nav-tabs.component';

describe('SettingNavTabsComponent', () => {
  let component: SettingNavTabsComponent;
  let fixture: ComponentFixture<SettingNavTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingNavTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingNavTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
