import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface MapPosition {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private baseUrl = '/api/position/';

  // Сигнал для хранения массива позиций
  positions = signal<MapPosition[]>([]);

  constructor(private http: HttpClient) {}

  // Загрузка позиций с сервера и установка сигнала
  loadPositions() {
    this.http.get<MapPosition[]>(this.baseUrl).subscribe({
      next: (data) => {
        this.positions.set(data);
        // console.log("позиции", data);
      },
      error: (err) => console.error('Ошибка загрузки позиций:', err),
    });
  }

  // Добавление новой позиции на сервер, и обновление сигнала с новыми данными
  addPosition(position: MapPosition) {
    return this.http.post<MapPosition>(this.baseUrl, position).subscribe({
      next: (newPosition) => {
        // Добавляем новую позицию в сигнал
        this.positions.set([...this.positions(), newPosition]);
      },
      error: (err) => console.error('Ошибка добавления позиции:', err),
    });
  }
}
