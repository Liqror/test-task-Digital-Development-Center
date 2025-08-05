import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
}

@Component({
  selector: 'app-news-tile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="news-tile">
      <h3>{{ news.title }}</h3>
      <p>{{ news.summary }}</p>
      <small>{{ news.date | date:'shortDate' }}</small>
    </article>
  `,
  styles: [`
    .news-tile {
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
    }
  `]
})
export class NewsTileComponent {
  @Input() news!: NewsItem;
}
