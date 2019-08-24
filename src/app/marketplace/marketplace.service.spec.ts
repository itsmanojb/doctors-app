import { TestBed, inject } from '@angular/core/testing';

import { MarketplaceService } from './marketplace.service';

describe('MarketplaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketplaceService]
    });
  });

  it('should be created', inject([MarketplaceService], (service: MarketplaceService) => {
    expect(service).toBeTruthy();
  }));
});
