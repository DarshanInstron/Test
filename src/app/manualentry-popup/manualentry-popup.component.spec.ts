import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualentryPopupComponent } from './manualentry-popup.component';

describe('ManualentryPopupComponent', () => {
  let component: ManualentryPopupComponent;
  let fixture: ComponentFixture<ManualentryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualentryPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualentryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
