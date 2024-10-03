import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpipageComponent } from './kpipage.component';

describe('KpipageComponent', () => {
  let component: KpipageComponent;
  let fixture: ComponentFixture<KpipageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpipageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpipageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
