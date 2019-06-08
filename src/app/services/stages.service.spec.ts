import { TestBed, inject } from '@angular/core/testing';

import { StagesService } from './stages.service';

describe('StagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StagesService]
    });
  });

  it('should be created', inject([StagesService], (service: StagesService) => {
    expect(service).toBeTruthy();
  }));
});
