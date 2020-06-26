import { TestBed } from '@angular/core/testing';
import {SecureInnerPagesGuard} from "./secure-inner-pages.guard.ts.guard";


describe('SecureInnerPages.Guard.TsGuard', () => {
  // @ts-ignore
  let guard: SecureInnerPagesGuard.TsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
