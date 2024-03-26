import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressCheckoutComponent } from './express-checkout.component';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/reducers/product.reducer';
import { SnackBarUtil } from '../../../app/utils/snackbar.util';
import { StripeFactoryService, injectStripe } from 'ngx-stripe';

describe('ExpressCheckoutComponent', () => {
  let component: ExpressCheckoutComponent;
  let fixture: ComponentFixture<ExpressCheckoutComponent>;

  beforeEach(async () => {
    const spyBottomSheet = jasmine.createSpyObj('MatBottomSheet', ['open']);
    const spySnackBar = jasmine.createSpyObj('SnackBarUtil', ['openSnackBar']);
    const spyStore = jasmine.createSpyObj('Store<AppState>', ['dispatch']);
    const spyStripeFactory = jasmine.createSpyObj('StripeFactoryService', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ExpressCheckoutComponent],
      providers: [
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: {},
        },
        {
          provide: Store<AppState>,
          useValue: spyStore,
        },
        {
          provide: MatBottomSheet,
          useValue: spyBottomSheet,
        },
        {
          provide: SnackBarUtil,
          useValue: spySnackBar,
        },
        {
          provide: StripeFactoryService,
          useValue: spyStripeFactory,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpressCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
