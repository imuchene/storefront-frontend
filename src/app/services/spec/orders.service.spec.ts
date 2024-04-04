import { TestBed } from '@angular/core/testing';
import { OrdersService } from '../orders.service';
import { HttpClient } from '@angular/common/http';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { Order } from '../../../app/models/order.model';
import { OrderResponse } from '../../models/responses/order-response.model';

describe('Orders Service', () => {
  let service: OrdersService;
  let httpSpy: Spy<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersService, { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }],
    });

    service = TestBed.inject(OrdersService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new order', (done: DoneFn) => {
    const mockOrder: Order = {
      id: '4cea31e8-b174-4eca-91da-c198e05f5bdf',
      totalAmount: 55.25,
      orderItems: [
        {
          productId: '58c8b52f-98fb-43bb-8d43-773b548db364',
          quantity: 2,
        },
        {
          productId: 'd941984d-1e6c-41fe-b7d5-6cdf8f2c0c67',
          quantity: 3,
        },
      ],
      paymentMethod: 'Credit/Debit Card',
    };

    const mockOrderResponse: OrderResponse = {
      id: '4cea31e8-b174-4eca-91da-c198e05f5bdf',
      customerId: '1579d0cd-e2ef-479c-b745-3c406595049a',
      totalAmount: 55.25,
      orderItems: [
        {
          productId: '58c8b52f-98fb-43bb-8d43-773b548db364',
          quantity: 2,
          orderId: '4cea31e8-b174-4eca-91da-c198e05f5bdf',
        },
        {
          productId: 'd941984d-1e6c-41fe-b7d5-6cdf8f2c0c67',
          quantity: 3,
          orderId: '4cea31e8-b174-4eca-91da-c198e05f5bdf',
        },
      ],
      paymentStatus: 'Created',
      createdAt: '2024-04-04T14:32:35.775Z',
      updatedAt: '2024-04-04T14:32:35.775Z',
      clientSecret: 'pi_3P1rLEGIyORaO7x30hsuAX9N_secret_crHdsF6DR9G0HmczqV4iqmcxN',
      customerName: 'Test User',
    };

    httpSpy.post.and.nextWith(mockOrderResponse);

    service.createOrder(mockOrder).subscribe({
      next: (response) => {
        expect(response).toEqual(mockOrderResponse);
        done();
      },
      error: () => {
        done.fail;
      },
    });

    expect(httpSpy.post.calls.count()).toBe(1);
  });
});
