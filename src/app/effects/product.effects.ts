import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { loadProductsFailureAction, loadProductsSuccessAction } from '../actions/product.actions';
import { ProductActionTypes } from '../enums/product.enum';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionTypes.LOAD_PRODUCTS),
      mergeMap(() =>
        this.productsService.getProducts().pipe(
          map((products) => loadProductsSuccessAction({ products: products })),
          catchError((error) => of(loadProductsFailureAction(error))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
  ) {}
}
