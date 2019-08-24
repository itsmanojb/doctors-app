import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealMapComponent } from './deal-map.component';

describe('DealMapComponent', () => {
  let component: DealMapComponent;
  let fixture: ComponentFixture<DealMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealMapComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
