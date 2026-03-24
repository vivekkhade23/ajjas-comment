import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({ standalone: true, imports: [CommonModule], templateUrl: './billing-page.component.html' })
export class BillingPageComponent {
  private api = inject(ApiService);
  loading = false;
  message = '';

  subscribe(plan: 'starter' | 'growth' | 'enterprise') {
    this.loading = true;
    this.api.createSubscription({ plan }).subscribe({
      next: (res) => {
        this.message = `Subscription ${res.data.id} created. Complete checkout in Razorpay hosted flow.`;
        this.loading = false;
      },
      error: (e) => {
        this.message = e?.error?.message || 'Could not create subscription';
        this.loading = false;
      }
    });
  }
}
