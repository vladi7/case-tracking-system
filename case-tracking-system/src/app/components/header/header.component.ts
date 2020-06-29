import { Component } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    '.background {background:#000000; color: white}',
    'li a { color: white}',
    'ul.nav a:hover { color: #fffccc  }'
  ]
})
// navbar toggling
export class HeaderComponent {
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  constructor(public authService: AuthService) {}

}

