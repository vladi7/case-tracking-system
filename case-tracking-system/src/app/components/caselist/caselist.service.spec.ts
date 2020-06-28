import { TestBed } from '@angular/core/testing';

import { CaselistService } from './caselist.service';

describe('CaselistService', () => {
  let service: CaselistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaselistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
