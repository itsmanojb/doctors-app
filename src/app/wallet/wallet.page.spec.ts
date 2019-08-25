import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletPage } from './wallet.page';

describe('WalletPage', () => {
  let component: WalletPage;
  let fixture: ComponentFixture<WalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
