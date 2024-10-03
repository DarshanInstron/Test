import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossesEntryComponent } from './losses-entry.component';

describe('LossesEntryComponent', () => {
  let component: LossesEntryComponent;
  let fixture: ComponentFixture<LossesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LossesEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LossesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
