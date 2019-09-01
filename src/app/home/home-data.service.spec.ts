import { TestBed } from '@angular/core/testing';

import { HomeDataService } from './home-data.service';

describe('HomeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeDataService = TestBed.get(HomeDataService);
    expect(service).toBeTruthy();
  });
});
