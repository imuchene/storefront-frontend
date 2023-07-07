import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { AppState } from 'src/app/reducers/product.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { AutoLogoffService } from 'src/app/services/auto-logoff.service';
import { Store } from '@ngrx/store';
import { MaterialModule } from 'src/app/material.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const router = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
    const spyStore = jasmine.createSpyObj('Store<AppState>', ['select']);
    const authService = jasmine.createSpyObj('AuthService', ['logout']);
    const autoLogoff = jasmine.createSpyObj('AutoLogoffService', ['test']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [AppComponent],
      providers: [
        // When you import RouterTestingModule, you should remove all router
        // mocked providers, save for ActiveRoute, etc: https://stackoverflow.com/questions/47140560/angular-unit-testing-typeerror-cannot-read-property-root-of-undefined
        { provide: Store<AppState>, useValue: spyStore },
        { provide: AuthService, useValue: authService },
        { provide: AutoLogoffService, useValue: autoLogoff },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'storefront-frontend'`, () => {
    expect(component.title).toEqual('storefront-frontend');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('storefront-frontend app is running!');
  });
});
