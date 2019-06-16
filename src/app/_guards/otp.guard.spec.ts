import { TestBed, async, inject } from '@angular/core/testing';

import { OtpGuard } from './otp.guard';

describe('OtpGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtpGuard]
    });
  });

  it('should ...', inject([OtpGuard], (guard: OtpGuard) => {
    expect(guard).toBeTruthy();
  }));
});
