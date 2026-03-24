import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:5000/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  getAnalytics() { return this.http.get<any>(`${API}/analytics`); }
  getAiInsights() { return this.http.get<any>(`${API}/analytics/ai-insights`); }
  getAppointments() { return this.http.get<any>(`${API}/appointments`); }
  createAppointment(payload: any) { return this.http.post<any>(`${API}/appointments`, payload); }
  getStaff() { return this.http.get<any>(`${API}/tenants/staff`); }
  addStaff(payload: any) { return this.http.post<any>(`${API}/tenants/staff`, payload); }
  createSubscription(payload: { plan: string }) { return this.http.post<any>(`${API}/billing/subscriptions`, payload); }
  getTenants() { return this.http.get<any>(`${API}/tenants`); }
}
