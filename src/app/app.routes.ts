import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { ShellComponent } from './layout/shell.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'news', pathMatch: 'full' },
      {
        path: 'news',
        loadComponent: () => import('./features/news/news-list.component').then(m => m.NewsListComponent),
          canActivate: [authGuard]
      },
      {
        path: 'map',
        loadComponent: () => import('./features/map/map-page.component').then(m => m.MapPageComponent),
        canActivate: [authGuard]
      }
    ]
  },
  { path: '**', redirectTo: '', }
];
