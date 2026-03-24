import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../core/services/api.service';

Chart.register(...registerables);

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements AfterViewInit {
  private api = inject(ApiService);
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  kpis = { totalAppointments: 0, revenue: 0 };
  insights: any = null;

  ngAfterViewInit(): void {
    this.api.getAnalytics().subscribe((res) => {
      this.kpis = res.data;
      this.renderChart(res.data.dailyStats || []);
    });
    this.api.getAiInsights().subscribe((res) => (this.insights = res.data));
  }

  renderChart(stats: Array<any>) {
    const labels = stats.map((x) => `${x._id.d}/${x._id.m}`);
    const values = stats.map((x) => x.revenue);

    new Chart(this.canvasRef.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{ label: 'Revenue', data: values, borderColor: '#4f46e5', tension: 0.3 }]
      }
    });
  }
}
