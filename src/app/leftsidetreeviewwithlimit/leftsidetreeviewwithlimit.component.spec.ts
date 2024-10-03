import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsidetreeviewwithlimitComponent } from './leftsidetreeviewwithlimit.component';

describe('LeftsidetreeviewwithlimitComponent', () => {
  let component: LeftsidetreeviewwithlimitComponent;
  let fixture: ComponentFixture<LeftsidetreeviewwithlimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftsidetreeviewwithlimitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftsidetreeviewwithlimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
