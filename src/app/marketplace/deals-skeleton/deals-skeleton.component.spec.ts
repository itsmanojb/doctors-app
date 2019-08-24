import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsSkeletonComponent } from './deals-skeleton.component';

describe('DealsSkeletonComponent', () => {
  let component: DealsSkeletonComponent;
  let fixture: ComponentFixture<DealsSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
