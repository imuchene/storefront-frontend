import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomerRegistration } from '../models/customer-registration.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };

    return this.http.post<any>(
      environment.apiUrl + 'auth/login',
      { email: email, password: password },
      httpOptions
    );
  }

  register(
    customerRegistration: CustomerRegistration
  ): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };

    return this.http.post<any>(
      environment.apiUrl + 'auth/register',
      customerRegistration,
      httpOptions
    );
  }
}
