import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Treeleveladdupdate1Component } from './treeleveladdupdate1.component';

describe('Treeleveladdupdate1Component', () => {
  let component: Treeleveladdupdate1Component;
  let fixture: ComponentFixture<Treeleveladdupdate1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Treeleveladdupdate1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Treeleveladdupdate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
