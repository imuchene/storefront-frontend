import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/product.reducer';
import { SnackBarUtil } from 'src/app/utils/snackbar.util';
import { MaterialModule } from 'src/app/material.module';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    const spyStore = jasmine.createSpyObj('Store<AppState>', ['select', 'dispatch']);
    const spySnackBar = jasmine.createSpyObj('SnackBarUtil', ['openSnackBar']);

    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ProductComponent],
      providers: [
        { provide: Store<AppState>, useValue: spyStore },
        { provide: SnackBarUtil, useValue: spySnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
