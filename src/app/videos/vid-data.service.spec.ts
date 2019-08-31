import { TestBed } from '@angular/core/testing';

import { VidDataService } from './vid-data.service';

describe('VidDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VidDataService = TestBed.get(VidDataService);
    expect(service).toBeTruthy();
  });
});
