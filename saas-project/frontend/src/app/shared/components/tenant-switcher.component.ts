import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-tenant-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<select [(ngModel)]="active" (ngModelChange)="switchTenant($event)"><option *ngFor="let t of tenants" [value]="t._id">{{t.name}}</option></select>`
})
export class TenantSwitcherComponent {
  private api = inject(ApiService);
  private storage = inject(StorageService);
  tenants: Array<{ _id: string; name: string }> = [];
  active = this.storage.tenantId || '';

  constructor() {
    this.api.getTenants().subscribe((res) => {
      this.tenants = res.data;
      if (!this.active && this.tenants.length) {
        this.active = this.tenants[0]._id;
        this.storage.tenantId = this.active;
      }
    });
  }

  switchTenant(value: string) {
    this.storage.tenantId = value;
    window.location.reload();
  }
}
