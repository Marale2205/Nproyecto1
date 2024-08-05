import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacetasComponent } from './macetas.component';

describe('MacetasComponent', () => {
  let component: MacetasComponent;
  let fixture: ComponentFixture<MacetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MacetasComponent]
    });
    fixture = TestBed.createComponent(MacetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
