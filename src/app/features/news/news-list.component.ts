import { Component, ElementRef, ViewChild, AfterViewInit, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsTileComponent } from './news-tile.component';
import { NewsService } from '../../core/news.service';
import Masonry from 'masonry-layout';

@Component({
    selector: 'app-news-list',
    imports: [CommonModule, NewsTileComponent],
    template: `
    <section>
      <div class="view-toggle">
        <button 
          (click)="viewMode.set('list')" 
          [class.active]="viewMode() === 'list'"
        >
          ☰ Список
        </button>
        <button 
          (click)="viewMode.set('tile')" 
          [class.active]="viewMode() === 'tile'"
        >
          ◼ Плитка
        </button>
      </div>

      <ul *ngIf="viewMode() === 'list'" class="news-list">
        <li *ngFor="let news of newsList()" class="news-item">
          <h3>{{ news.title }}</h3>
          <p>{{ news.content }}</p>
        </li>
      </ul>

      <div *ngIf="viewMode() === 'tile'" class="news-masonry" #masonryContainer>
        <app-news-tile 
          *ngFor="let news of newsList()" 
          [news]="news"
          class="grid-item"
        ></app-news-tile>
      </div>
    </section>
  `,
    styles: [`
    .view-toggle {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .view-toggle button {
      font-size: 1rem;
      padding: 0.5rem 1.2rem;
      border: 2px solid #007acc;
      background-color: white;
      color: #007acc;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .view-toggle button:hover:not(:disabled),
    .view-toggle button.active {
      background-color: #007acc;
      color: white;
    }

    .news-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .news-item {
      padding: 0rem 0.7rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      transform: translateY(-3px);
    }

    .news-masonry {
      display: block;
    }

    .grid-item {
      width: 100%;
      margin-bottom: 1rem;
    }

    @media (min-width: 600px) {
      .grid-item {
        width: 48%;
      }
    }

    @media (min-width: 900px) {
      .grid-item {
        width: 31%;
      }
    }

    @media (min-width: 1200px) {
      .grid-item {
        width: 23%;
      }
    }
  `]
})
export class NewsListComponent implements AfterViewInit {
  @ViewChild('masonryContainer', { static: false }) masonryContainer?: ElementRef<HTMLElement>;

  viewMode = signal<'list' | 'tile'>('list');
  masonryInstance: Masonry | null = null;

  constructor(public newsService: NewsService) {
    this.newsService.loadNews();

    // При смене режима — вызываем функцию перестроения
    effect(() => {
      const mode = this.viewMode();
      if (mode === 'tile') {
        // Делаем небольшой таймаут чтобы Angular отрисовал плитки
        setTimeout(() => this.initMasonry(), 100);
      } else {
        // Очищаем masonry при переходе на список
        this.destroyMasonry();
      }
    });

    // При изменении списка новостей в режиме плитки тоже перестраиваем
    effect(() => {
      const news = this.newsList();
      if (this.viewMode() === 'tile') {
        setTimeout(() => this.layoutMasonry(), 100);
      }
    });
  }

  newsList = this.newsService.news;

  ngAfterViewInit(): void {
    if (this.viewMode() === 'tile') {
      this.initMasonry();
    }
  }

  initMasonry() {
    if (!this.masonryContainer) return;

    // Если уже есть инстанс — уничтожаем его
    this.destroyMasonry();

    this.masonryInstance = new Masonry(this.masonryContainer.nativeElement, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-item',
      percentPosition: true,
      gutter: 16,
    });

    this.layoutMasonry();
  }

  layoutMasonry() {
    if (!this.masonryInstance) return;
    this.masonryInstance.reloadItems?.();
    this.masonryInstance.layout?.();
  }

  destroyMasonry() {
    if (this.masonryInstance) {
      this.masonryInstance.destroy?.();
      this.masonryInstance = null;
    }
  }
}