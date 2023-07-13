import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: typeof AuthGuard;
  const testGuard = AuthGuard;
  const spyGuard = jasmine.createSpy('AuthGuard', testGuard);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthGuard, useValue: spyGuard }],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
