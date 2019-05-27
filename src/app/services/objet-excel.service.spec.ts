import { TestBed, inject } from '@angular/core/testing';

import { ObjetExcelService } from './objet-excel.service';

describe('ObjetExcelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjetExcelService]
    });
  });

  it('should be created', inject([ObjetExcelService], (service: ObjetExcelService) => {
    expect(service).toBeTruthy();
  }));
});
