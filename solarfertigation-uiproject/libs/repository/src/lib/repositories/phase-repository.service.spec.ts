import { TestBed } from '@angular/core/testing';

import { PhaseRepositoryService } from './phase-repository.service';

describe('PhaseRepositoryService', () => {
  let service: PhaseRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhaseRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
