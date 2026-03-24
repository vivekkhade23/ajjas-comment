import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-page.component.html'
})
export class AppointmentsPageComponent {
  private api = inject(ApiService);
  rows: any[] = [];
  model = { patientName: '', phone: '', date: '', amount: 0 };

  constructor() {
    this.refresh();
  }

  refresh() {
    this.api.getAppointments().subscribe((res) => (this.rows = res.data));
  }

  save() {
    this.api.createAppointment(this.model).subscribe(() => {
      this.model = { patientName: '', phone: '', date: '', amount: 0 };
      this.refresh();
    });
  }
}
