import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

const API = 'http://localhost:5000/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  login(payload: { email: string; password: string }) {
    return this.http.post<{ token: string; user: { tenantId: string; tenants: Array<{ tenantId: string }> } }>(`${API}/auth/login`, payload)
      .pipe(tap((res) => {
        this.storage.token = res.token;
        this.storage.tenantId = res.user.tenantId || res.user.tenants[0]?.tenantId;
      }));
  }

  isLoggedIn() {
    return !!this.storage.token;
  }

  logout() {
    this.storage.token = null;
    this.storage.tenantId = null;
  }
}
