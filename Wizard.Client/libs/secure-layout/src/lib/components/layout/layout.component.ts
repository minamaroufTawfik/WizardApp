import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@wizard/shared/data-access';

@Component({
  selector: 'wizard-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class SecureLayoutComponent {
  constructor(private authService: AuthService, private router: Router) {

  }

  logout(): void {
    this.authService.signOut();
    this.router.navigateByUrl('auth/login');
  }
}
