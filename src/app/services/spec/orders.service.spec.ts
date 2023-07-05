import { TestBed } from '@angular/core/testing';

import { OrdersService } from '../orders.service';

describe('OrdersService', () => {
  let service: jasmine.SpyObj<OrdersService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('OrdersService', ['createOrder']);

    TestBed.configureTestingModule({
      providers: [{ provide: OrdersService, useValue: spy }],
    });

    service = TestBed.inject(OrdersService) as jasmine.SpyObj<OrdersService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
