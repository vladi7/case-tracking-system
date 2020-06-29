import { TestBed } from '@angular/core/testing';

import { CreateserviceService } from './createservice.service';

describe('CreateserviceService', () => {
  let service: CreateserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
