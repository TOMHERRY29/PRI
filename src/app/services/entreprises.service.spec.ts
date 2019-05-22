import { TestBed, inject } from '@angular/core/testing';

import { EntreprisesService } from './entreprises.service';

describe('EntreprisesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntreprisesService]
    });
  });

  it('should be created', inject([EntreprisesService], (service: EntreprisesService) => {
    expect(service).toBeTruthy();
  }));
});
