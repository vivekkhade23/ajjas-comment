import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  get token(): string | null {
    return localStorage.getItem('token');
  }
  set token(value: string | null) {
    if (!value) localStorage.removeItem('token');
    else localStorage.setItem('token', value);
  }

  get tenantId(): string | null {
    return localStorage.getItem('tenantId');
  }
  set tenantId(value: string | null) {
    if (!value) localStorage.removeItem('tenantId');
    else localStorage.setItem('tenantId', value);
  }
}
