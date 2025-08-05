import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getItem(key: string): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}
