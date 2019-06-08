import { TestBed, inject } from '@angular/core/testing';

import { TuteursService } from './tuteurs.service';

describe('TuteursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TuteursService]
    });
  });

  it('should be created', inject([TuteursService], (service: TuteursService) => {
    expect(service).toBeTruthy();
  }));
});
