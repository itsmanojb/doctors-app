import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplacePage } from './marketplace.page';

describe('MarketplacePage', () => {
  let component: MarketplacePage;
  let fixture: ComponentFixture<MarketplacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
