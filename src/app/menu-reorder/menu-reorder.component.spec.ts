import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReorderComponent } from './menu-reorder.component';

describe('MenuReorderComponent', () => {
  let component: MenuReorderComponent;
  let fixture: ComponentFixture<MenuReorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuReorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
