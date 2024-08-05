import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonoComponent } from './abono.component';

describe('AbonoComponent', () => {
  let component: AbonoComponent;
  let fixture: ComponentFixture<AbonoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbonoComponent]
    });
    fixture = TestBed.createComponent(AbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
