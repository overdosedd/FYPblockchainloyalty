import { TestBed } from '@angular/core/testing';

import { BigChainDBService } from './big-chain-db.service';

describe('BigChainDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BigChainDBService = TestBed.get(BigChainDBService);
    expect(service).toBeTruthy();
  });
});
