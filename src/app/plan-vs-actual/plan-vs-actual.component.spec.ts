import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanVsActualComponent } from './plan-vs-actual.component';

describe('PlanVsActualComponent', () => {
  let component: PlanVsActualComponent;
  let fixture: ComponentFixture<PlanVsActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanVsActualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanVsActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
