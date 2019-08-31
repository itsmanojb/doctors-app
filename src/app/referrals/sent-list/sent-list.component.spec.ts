import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentListComponent } from './sent-list.component';

describe('SentListComponent', () => {
  let component: SentListComponent;
  let fixture: ComponentFixture<SentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
