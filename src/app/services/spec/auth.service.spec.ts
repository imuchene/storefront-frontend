import { TestBed } from '@angular/core/testing';

import { AuthService } from '../auth.service';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CustomerRegistration } from '../../../app/models/customer-registration.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpSpy: Spy<HttpClient>;
  let routerSpy: Spy<Router>;
  let cookieSpy: Spy<CookieService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
        { provide: Router, useValue: createSpyFromClass(Router) },
        { provide: CookieService, useValue: createSpyFromClass(CookieService) },
      ],
    });

    service = TestBed.inject(AuthService);
    httpSpy = TestBed.inject<any>(HttpClient);
    routerSpy = TestBed.inject<any>(Router);
    cookieSpy = TestBed.inject<any>(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a customer', (done: DoneFn) => {
    const mockCustomer: CustomerRegistration = {
      name: 'Fred Jones',
      email: 'fred@example.com',
      phoneNumber: '0720123458',
      password: 'testuser',
      confirmPassword: 'testuser',
    };

    httpSpy.post.and.nextWith(mockCustomer);

    service.register(mockCustomer).subscribe({
      next: (customer) => {
        expect(customer.body).toEqual(mockCustomer);
        done();
      },
      error: () => {
        done.fail;
      },
    });

    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should login a customer', (done: DoneFn) => {});

  it('should logout a customer', (done: DoneFn) => {});
});
