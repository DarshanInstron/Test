import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragdropCustomComponent } from './dragdrop-custom.component';

describe('DragdropCustomComponent', () => {
  let component: DragdropCustomComponent;
  let fixture: ComponentFixture<DragdropCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragdropCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragdropCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
