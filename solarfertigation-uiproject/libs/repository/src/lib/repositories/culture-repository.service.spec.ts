import { TestBed } from '@angular/core/testing';

import { CultureRepositoryService } from './culture-repository.service';

describe('CultureRepositoryService', () => {
  let service: CultureRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CultureRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
