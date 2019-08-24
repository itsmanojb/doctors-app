import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealItemComponent } from './deal-item.component';

describe('DealItemComponent', () => {
  let component: DealItemComponent;
  let fixture: ComponentFixture<DealItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
