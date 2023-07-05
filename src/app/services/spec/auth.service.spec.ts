import { TestBed } from '@angular/core/testing';

import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', [
      'login',
      'register',
      'logout',
      'isLoggedIn',
      'setLoggedInCookie',
      'checkLoggedIn',
      'deleteLoggedInCookie',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: spy }],
    });

    service = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
