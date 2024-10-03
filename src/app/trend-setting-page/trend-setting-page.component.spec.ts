import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrendSettingPageComponent } from './trend-setting-page.component';

describe('TrendSettingPageComponent', () => {
  let component: TrendSettingPageComponent;
  let fixture: ComponentFixture<TrendSettingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrendSettingPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrendSettingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});