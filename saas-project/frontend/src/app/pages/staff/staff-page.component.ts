import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], templateUrl: './staff-page.component.html' })
export class StaffPageComponent {
  private api = inject(ApiService);
  staff: any[] = [];
  model = { name: '', email: '', password: '', role: 'staff' };

  constructor() { this.refresh(); }

  refresh() { this.api.getStaff().subscribe((res) => (this.staff = res.data)); }
  add() { this.api.addStaff(this.model).subscribe(() => { this.model = { name: '', email: '', password: '', role: 'staff' }; this.refresh(); }); }
}
