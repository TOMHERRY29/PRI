import { TestBed, inject } from '@angular/core/testing';

import { StagiairesService } from './stagiaires.service';

describe('StagiairesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StagiairesService]
    });
  });

  it('should be created', inject([StagiairesService], (service: StagiairesService) => {
    expect(service).toBeTruthy();
  }));
});
