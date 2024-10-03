import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardLossesEntryComponent } from './standard-losses-entry.component';

describe('StandardLossesEntryComponent', () => {
  let component: StandardLossesEntryComponent;
  let fixture: ComponentFixture<StandardLossesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardLossesEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardLossesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
