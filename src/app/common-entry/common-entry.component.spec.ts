import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonEntryComponent } from './common-entry.component';

describe('CommonEntryComponent', () => {
  let component: CommonEntryComponent;
  let fixture: ComponentFixture<CommonEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonEntryComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CommonEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});