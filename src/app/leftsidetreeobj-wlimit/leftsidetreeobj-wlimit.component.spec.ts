import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsidetreeobjWlimitComponent } from './leftsidetreeobj-wlimit.component';

describe('LeftsidetreeobjWlimitComponent', () => {
  let component: LeftsidetreeobjWlimitComponent;
  let fixture: ComponentFixture<LeftsidetreeobjWlimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftsidetreeobjWlimitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftsidetreeobjWlimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
