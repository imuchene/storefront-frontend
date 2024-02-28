import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressCheckoutComponent } from './express-checkout.component';

describe('ExpressCheckoutComponent', () => {
  let component: ExpressCheckoutComponent;
  let fixture: ComponentFixture<ExpressCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressCheckoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpressCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
