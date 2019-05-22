import { TestBed, inject } from '@angular/core/testing';

import { SemestresService } from './semestres.service';

describe('SemestresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SemestresService]
    });
  });

  it('should be created', inject([SemestresService], (service: SemestresService) => {
    expect(service).toBeTruthy();
  }));
});
