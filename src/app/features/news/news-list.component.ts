import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NewsTileComponent, NewsItem } from './news-tile.component';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, NewsTileComponent],
  template: `
    <section>
      <div class="view-toggle">
        <button (click)="viewMode.set('list')" [disabled]="viewMode() === 'list'">Список</button>
        <button (click)="viewMode.set('tile')" [disabled]="viewMode() === 'tile'">Плитка</button>
      </div>

      <ul *ngIf="viewMode() === 'list'">
        <li *ngFor="let news of newsList">
          <h3>{{ news.title }}</h3>
          <p>{{ news.summary }}</p>
          <small>{{ news.date | date:'shortDate' }}</small>
        </li>
      </ul>

      <div *ngIf="viewMode() === 'tile'" class="tiles">
        <app-news-tile *ngFor="let news of newsList" [news]="news"></app-news-tile>
      </div>
    </section>
  `,
  styles: [`
    .view-toggle {
      margin-bottom: 1rem;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      border-bottom: 1px solid #ddd;
      padding: 0.5rem 0;
    }
    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
      gap: 1rem;
    }
  `]
})
export class NewsListComponent {
  newsList: NewsItem[] = [];
  viewMode = signal<'list' | 'tile'>('list');

  constructor(private http: HttpClient) {
    this.loadNews();
  }

  loadNews() {
    this.http.get<NewsItem[]>('http://localhost:8000/api/news/').subscribe({
      next: (data) => this.newsList = data,
      error: (err) => console.error('Error loading news:', err)
    });
  }
}
