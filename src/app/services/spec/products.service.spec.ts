import { TestBed } from '@angular/core/testing';

import { ProductsService } from '../products.service';

describe('ProductsService', () => {
  let service: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductsService', ['getProducts']);

    TestBed.configureTestingModule({
      providers: [{ provide: ProductsService, useValue: spy }],
    });

    service = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
