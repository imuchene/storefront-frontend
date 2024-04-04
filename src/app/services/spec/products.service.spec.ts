import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { ProductsService } from '../products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('Products Service', () => {
  let service: ProductsService;
  let httpSpy: Spy<HttpClient>;

  const mockProduct = {
    name: 'Test Product 03',
    unitPrice: 10.13,
    description: 'Test Product 03',
    imageUrl: 'http://www.fake-url.com/image.jpg',
    id: '10335531-df60-4c24-9597-8ce13d841929',
    createdAt: '2022-06-08T13:57:28.247Z',
    updatedAt: '2022-06-08T13:57:28.247Z',
    deletedAt: null,
  };

  const mockProducts = Array(5).fill(mockProduct);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        {
          provide: HttpClient,
          useValue: createSpyFromClass(HttpClient),
        },
      ],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ProductsService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an expected list of products', (done: DoneFn) => {
    httpSpy.get.and.nextWith(mockProducts);

    service.getProducts().subscribe({
      next: (products) => {
        expect(products).toBe(mockProducts);
        done();
      },
      error: (e) => done.fail,
    });

    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
