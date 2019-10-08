import { TestBed } from '@angular/core/testing';

import { AnnuairesService } from './annuaires.service';

describe('AnnuairesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnuairesService = TestBed.get(AnnuairesService);
    expect(service).toBeTruthy();
  });
});
