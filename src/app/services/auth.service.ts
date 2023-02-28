import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private snackBar: MatSnackBar, 
    public dialog: MatDialog,
    private cookieService: CookieService
    ) { }

  login(email: string, password: string){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      // withCredentials: true
    };
    
    return this.http.post<any>(environment.baseUrl + 'auth/login', { email: email, password: password}, httpOptions)
    .subscribe({
      next: (res) => {
        console.log('User is logged in');
        this.dialog.closeAll();
        this.getAuthCookie();
        this.router.navigateByUrl('payment');
      },
      // On login failure
      error: (error) => {
        this.openSnackBar();
      }
    })
  }

  openSnackBar() {
    this.snackBar.open('Wrong Username/Password', 'Dismiss', {
      duration: 3000
    });
  }

  getAuthCookie(){
    const authCookie = this.cookieService.get('auth-cookie');
    console.log('auth-cookie', authCookie);
  }

}
