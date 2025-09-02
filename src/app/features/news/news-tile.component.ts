import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItem } from '../../core/news.service';

@Component({
    selector: 'app-news-tile',
    imports: [CommonModule],
    template: `
    <article class="news-tile">
      <h3>{{ news.title }}</h3>
      <p>{{ news.content }}</p>
    </article>
  `,
    styles: [`
    .news-tile {
      padding: 1rem;
      border-radius: 8px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s;
      overflow-wrap: break-word;
    }

    .news-tile:hover {
      transform: translateY(-3px);
    }

    .news-tile h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    .news-tile p {
      margin: 0;
    }
  `]
})
export class NewsTileComponent {
  @Input() news!: NewsItem;
}
