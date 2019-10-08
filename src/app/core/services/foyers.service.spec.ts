import { TestBed } from '@angular/core/testing';

import { FoyersService } from './foyers.service';

describe('FoyersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoyersService = TestBed.get(FoyersService);
    expect(service).toBeTruthy();
  });
});
