import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .content {
      padding: 1rem;
    }
  `]
})
export class ShellComponent {}
