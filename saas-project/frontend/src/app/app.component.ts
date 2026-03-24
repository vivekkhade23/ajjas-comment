import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  template: `<app-layout [isLoggedIn]="auth.isLoggedIn()"><router-outlet /></app-layout>`
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
