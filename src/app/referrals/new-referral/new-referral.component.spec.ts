import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReferralComponent } from './new-referral.component';

describe('NewReferralComponent', () => {
  let component: NewReferralComponent;
  let fixture: ComponentFixture<NewReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
