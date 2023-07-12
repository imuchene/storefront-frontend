import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripeDialogComponent } from './stripe-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StripeService } from 'ngx-stripe';
import { SnackBarUtil } from 'src/app/utils/snackbar.util';
import { AppState } from 'src/app/reducers/product.reducer';
import { Store } from '@ngrx/store';

describe('StripeDialogComponent', () => {
  let component: StripeDialogComponent;
  let fixture: ComponentFixture<StripeDialogComponent>;

  beforeEach(async () => {
    const spyStripeService = jasmine.createSpyObj('StripeService', ['confirmPayment']);
    const spySnackBar = jasmine.createSpyObj('SnackBarUtil', ['openSnackBar']);
    const spyStore = jasmine.createSpyObj('Store<AppState>', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [StripeDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: StripeService, useValue: spyStripeService },
        { provide: SnackBarUtil, useValue: spySnackBar },
        { provide: Store<AppState>, useValue: spyStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StripeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
