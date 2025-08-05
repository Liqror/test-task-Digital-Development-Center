import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <button class="burger" (click)="toggleMenu()">
        ☰
      </button>
      <ul [class.open]="menuOpen()">
        <li><a routerLink="/news" routerLinkActive="active">Новости</a></li>
        <li><a routerLink="/map" routerLinkActive="active">Карта</a></li>
        <li><a  href="#" (click)="logout($event)">Выйти</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    nav {
      position: relative;
      background: #1976d2;
      color: white;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
    }
    .burger {
      display: none;
      font-size: 1.5rem;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
    }
    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 1rem;
    }
    ul.open {
      display: block;
      position: absolute;
      top: 2.5rem;
      left: 0;
      background: #1976d2;
      width: 100%;
      padding: 1rem 0;
    }
    li a {
      color: white;
      text-decoration: none;
    }
    li a.active {
      text-decoration: underline;
    }

    /* Адаптив */
    @media (max-width: 600px) {
      .burger {
        display: block;
      }
      ul {
        display: none;
        flex-direction: column;
      }
    }
  `]
})
export class NavbarComponent {
  menuOpen = signal(false);

  constructor(private auth: AuthService) {}

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
  }
}
