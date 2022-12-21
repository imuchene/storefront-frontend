import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'storefront-frontend';

  constructor(private router: Router){

  }

  test(){
    this.router.navigateByUrl('cart');
  }
}
