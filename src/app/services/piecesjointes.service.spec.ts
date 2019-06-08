import { TestBed, inject } from '@angular/core/testing';

import { PiecesjointesService } from './piecesjointes.service';

describe('PiecesjointesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiecesjointesService]
    });
  });

  it('should be created', inject([PiecesjointesService], (service: PiecesjointesService) => {
    expect(service).toBeTruthy();
  }));
});
