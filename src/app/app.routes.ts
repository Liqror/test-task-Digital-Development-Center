import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { ShellComponent } from './layout/shell.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'news',
        loadComponent: () => import('./features/news/news-list.component').then(m => m.NewsListComponent),
      },
      {
        path: 'map',
        loadComponent: () => import('./features/map/map-page.component').then(m => m.MapPageComponent),
        canActivate: [authGuard]  // невозможно войти если неавторизирован
      }
    ]
  },
  { path: '**', redirectTo: 'news', }
];
