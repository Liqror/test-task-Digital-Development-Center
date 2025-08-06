import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface NewsItem {
  id: number;
  title: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);

  news = signal<NewsItem[]>([]);

  loadNews() {
    this.http.get<NewsItem[]>('/api/news/').subscribe({
      next: (data) => {
        // console.log('Новости с сервера:', data);
        this.news.set(data);
      },
      error: (err) => {
        console.error('Ошибка загрузки новостей:', err);
      }
    });
  }
}
