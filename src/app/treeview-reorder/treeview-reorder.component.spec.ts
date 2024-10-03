import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeviewReorderComponent } from './treeview-reorder.component';

describe('TreeviewReorderComponent', () => {
  let component: TreeviewReorderComponent;
  let fixture: ComponentFixture<TreeviewReorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeviewReorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeviewReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
