import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentFormComponent } from './payment-form.component';
import { OrdersService } from 'src/app/services/orders.service';
import { AppState } from 'src/app/reducers/product.reducer';
import { Store } from '@ngrx/store';
import { MaterialModule } from 'src/app/material.module';

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;

  beforeEach(async () => {
    const spyOrdersService = jasmine.createSpyObj('OrdersService', ['createOrder']);
    const spyStore = jasmine.createSpyObj('Store<AppState>', ['select']);

    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [PaymentFormComponent],
      providers: [
        { provide: OrdersService, useValue: spyOrdersService },
        { provide: Store<AppState>, useValue: spyStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
