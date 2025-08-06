import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(StorageService); 

  private tokenKey = 'token';
  token = signal<string | null>(this.storage.getItem(this.tokenKey));

  login(username: string, password: string) {
    // console.log('Trying login with', username, password);
    const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    });
    this.http.post<{ key: string }>('/api/auth/login/', 
        { username, password },
        { headers }
    ).subscribe({
      next: res => {
        this.token.set(res.key);
        // console.log('AuthService token:', this.token());
        this.storage.setItem(this.tokenKey, res.key);
        this.router.navigate(['/news']);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  logout() {
    this.token.set(null);
    this.storage.removeItem(this.tokenKey); 
    this.router.navigate(['/news']);
  }

  isLoggedIn() {
    return !!this.token();
  }

  getToken() {
    return this.token();
  }
}
