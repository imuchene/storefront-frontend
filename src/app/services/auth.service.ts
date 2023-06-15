import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomerRegistration } from '../models/customer-registration.model';
import { CustomerLogin } from '../models/customer-login.model';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  login(login: CustomerLogin): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiUrl + 'auth/login', login, this.httpOptions);
  }

  register(customerRegistration: CustomerRegistration): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiUrl + 'auth/register', customerRegistration, this.httpOptions);
  }

  logout(): Observable<HttpResponse<any>> {
    this.deleteLoggedInCookie();
    return this.http.delete<any>(environment.apiUrl + 'auth/log_out', this.httpOptions);
  }

  public get isLoggedIn(): boolean {
    return this.checkLoggedIn();
  }

  // Since the auth-cookie from the backend is HTTP only (thus inaccessible from Javascript),
  // Create a new cookie to hold the customer's logged in status, and set it to expire after 10
  // minutes (similar to the auth-cookie)
  setLoggedInCookie() {
    const cookieExpiry: Date = new Date();
    cookieExpiry.setMinutes(cookieExpiry.getMinutes() + 10);
    this.cookieService.set('is-logged-in', 'true', cookieExpiry);
  }

  checkLoggedIn(): boolean {
    if (this.cookieService.get('is-logged-in') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  deleteLoggedInCookie() {
    this.cookieService.delete('is-logged-in');
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.checkLoggedIn();
    if (isLoggedIn) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
