import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsPage } from './referrals.page';

describe('ReferralsPage', () => {
  let component: ReferralsPage;
  let fixture: ComponentFixture<ReferralsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
