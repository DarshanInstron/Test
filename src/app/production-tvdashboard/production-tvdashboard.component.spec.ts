import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionTvdashboardComponent } from './production-tvdashboard.component';

describe('ProductionTvdashboardComponent', () => {
  let component: ProductionTvdashboardComponent;
  let fixture: ComponentFixture<ProductionTvdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionTvdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionTvdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
