import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './pages/login/login-page.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { AppointmentsPageComponent } from './pages/appointments/appointments-page.component';
import { StaffPageComponent } from './pages/staff/staff-page.component';
import { BillingPageComponent } from './pages/billing/billing-page.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardPageComponent },
      { path: 'appointments', component: AppointmentsPageComponent },
      { path: 'staff', component: StaffPageComponent },
      { path: 'billing', component: BillingPageComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
