import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpitreeviewwithlimitComponent } from './kpitreeviewwithlimit.component';

describe('KpitreeviewwithlimitComponent', () => {
  let component: KpitreeviewwithlimitComponent;
  let fixture: ComponentFixture<KpitreeviewwithlimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpitreeviewwithlimitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpitreeviewwithlimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
