import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomerRegistration } from '../models/customer-registration.model';
import { CustomerLogin } from '../models/customer-login.model';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  constructor(private http: HttpClient, private router: Router) {}

  login(login: CustomerLogin): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiUrl + 'auth/login', login, this.httpOptions);
  }

  register(customerRegistration: CustomerRegistration): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiUrl + 'auth/register', customerRegistration, this.httpOptions);
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.delete<any>(environment.apiUrl + 'auth/log_out', this.httpOptions);
  }

  public get isLoggedIn(): boolean {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
