import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsDashboardComponent } from './ems-dashboard.component';

describe('EmsDashboardComponent', () => {
  let component: EmsDashboardComponent;
  let fixture: ComponentFixture<EmsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
