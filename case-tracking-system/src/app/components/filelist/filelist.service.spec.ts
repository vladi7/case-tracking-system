import { TestBed } from '@angular/core/testing';

import { FilelistService } from './filelist.service';

describe('FilelistService', () => {
  let service: FilelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
