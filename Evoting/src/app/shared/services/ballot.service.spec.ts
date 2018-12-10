import { TestBed } from '@angular/core/testing';

import { BallotService } from './ballot.service';

describe('BallotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BallotService = TestBed.get(BallotService);
    expect(service).toBeTruthy();
  });
});
