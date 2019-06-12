import { TestBed, inject } from '@angular/core/testing';

import { StageTuteurService } from './stageTuteur.service';

describe('StageTuteurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StageTuteurService]
    });
  });

  it('should be created', inject([StageTuteurService], (service: StageTuteurService) => {
    expect(service).toBeTruthy();
  }));
});
