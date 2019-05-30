import { TestBed, inject } from '@angular/core/testing';

import { GlobalStageService } from './global-stage.service';

describe('GlobalStageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalStageService]
    });
  });

  it('should be created', inject([GlobalStageService], (service: GlobalStageService) => {
    expect(service).toBeTruthy();
  }));
});
