import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
    template: `
    <nav>
      <button class="burger" (click)="toggleMenu()">☰</button>
      <ul [class.open]="menuOpen()">
        <li><a routerLink="/news" routerLinkActive="active">Новости</a></li>
        <li *ngIf="isLoggedIn()">
          <a routerLink="/map" routerLinkActive="active">Карта</a>
        </li>
        <li>
          <a href="#" (click)="authAction($event)">
            <span *ngIf="isLoggedIn(); else loginIcon">Выйти</span>
            <ng-template #loginIcon>Войти</ng-template>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuOpen = signal(false);
  isLoggedIn = computed(() => this.auth.isLoggedIn());

  constructor(private auth: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  authAction(event: Event) {
    event.preventDefault();
    if (this.isLoggedIn()) {
      this.auth.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
