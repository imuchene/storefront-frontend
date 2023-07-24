import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarUtil } from 'src/app/utils/snackbar.util';
import { AppState } from 'src/app/reducers/product.reducer';
import { Store } from '@ngrx/store';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    const spyAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const spySnackBar = jasmine.createSpyObj('SnackBarUtil', ['openSnackBar']);
    const spyStore = jasmine.createSpyObj('Store<AppState>', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        { provide: AuthService, useValue: spyAuthService },
        { provide: SnackBarUtil, useValue: spySnackBar },
        { provide: Store<AppState>, useValue: spyStore },
      ],
      declarations: [CartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
