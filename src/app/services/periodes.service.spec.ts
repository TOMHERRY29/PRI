import { TestBed, inject } from '@angular/core/testing';

import { PeriodesService } from './periodes.service';

describe('PeriodesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeriodesService]
    });
  });

  it('should be created', inject([PeriodesService], (service: PeriodesService) => {
    expect(service).toBeTruthy();
  }));
});
