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
      <!-- <div class="container"> -->
        <router-outlet></router-outlet>
      <!-- </div> -->
    </main>
  `,
  styles: [`
    .content {
      padding: 2rem;
    }
    // .container {
    //   max-width: 900px;
    //   margin: 0 auto;
    //   background: white;
    //   padding: 2rem;
    //   border-radius: var(--border-radius);
    //   box-shadow: var(--shadow);
    // }

  `]
})
export class ShellComponent {}
