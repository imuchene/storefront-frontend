import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarUtil } from 'src/app/utils/snackbar.util';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/product.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    const spySnackBar = jasmine.createSpyObj('SnackBarUtil', ['openSnackBar']);
    const spyAuthService = jasmine.createSpyObj('AuthService', ['login']);
    const spyStore = jasmine.createSpyObj('Store<AppState>', ['select']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: SnackBarUtil, useValue: spySnackBar },
        { provide: AuthService, useValue: spyAuthService },
        { provide: Store<AppState>, useValue: spyStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
