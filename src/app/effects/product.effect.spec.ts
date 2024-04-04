import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ProductEffects } from './product.effects';
import { Product } from '../models/product.model';
import { ProductActionTypes } from '../enums/product.enum';
import { hot } from 'jasmine-marbles';

let actions$ = new Observable<Action>();
let testScheduler: TestScheduler;
const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts']);
const productEffectsSpy = jasmine.createSpyObj('ProductEffects', ['loadProducts$']);

beforeEach(async () => {
  await TestBed.configureTestingModule({
    providers: [
      provideMockActions(() => actions$),
      {
        provide: ProductEffects,
        useValue: productEffectsSpy,
      },
    ],
  }).compileComponents();

  testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
});

it('should get products', (done: DoneFn) => {
  const actions = new Actions(
    hot('-a--', {
      a: { type: ProductActionTypes.LOAD_PRODUCTS_SUCCESS },
    }),
  );
  const effects = new ProductEffects(actions, productServiceSpy);

  const products: Product[] = [];

  const expected = hot('-a--', {
    a: {
      type: ProductActionTypes.LOAD_PRODUCTS_SUCCESS,
      products: products,
    },
  });

  expect(effects.loadProducts$).toBeObservable(expected);

  done();
});
