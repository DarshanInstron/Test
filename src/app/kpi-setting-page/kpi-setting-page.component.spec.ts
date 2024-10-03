import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiSettingPageComponent } from './kpi-setting-page.component';

describe('KpiSettingPageComponent', () => {
  let component: KpiSettingPageComponent;
  let fixture: ComponentFixture<KpiSettingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiSettingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiSettingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
