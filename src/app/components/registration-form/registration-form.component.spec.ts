import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarUtil } from 'src/app/utils/snackbar.util';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    const spySnackBar = jasmine.createSpyObj('SnackBarUtil', ['openSnackBar']);
    const spyAuthService = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [RegistrationFormComponent],
      providers: [
        { provide: SnackBarUtil, useValue: spySnackBar },
        { provide: AuthService, useValue: spyAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
