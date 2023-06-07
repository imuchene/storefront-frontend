import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeDialogComponent } from './stripe-dialog.component';

describe('StripeDialogComponent', () => {
  let component: StripeDialogComponent;
  let fixture: ComponentFixture<StripeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StripeDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StripeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
