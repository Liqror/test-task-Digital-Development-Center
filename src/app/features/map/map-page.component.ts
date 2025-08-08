import { Component, AfterViewInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapService, MapPosition } from '../../core/map.service';
import { effect } from '@angular/core';

const customIcon = L.icon({
  iconUrl: 'assets/map.png',
  iconSize: [25, 41],        
  iconAnchor: [12, 41],     
  popupAnchor: [1, -34],     
  shadowUrl: '',             
});

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private mapInitialized = false;

  showForm = false;
  formPosition = { top: 0, left: 0 };
  newPointName = '';
  clickedLatLng: L.LatLng | null = null;

  constructor(public mapService: MapService) {
    // effect создаем здесь, в конструкторе — в контексте инъекции
    effect(() => {
      const positions = this.mapService.positions();
      if (this.mapInitialized) {
        // console.log('добавляем маркеры:', positions);
        this.clearMarkers();
        this.addMarkers(positions);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.mapInitialized = true;
    this.mapService.loadPositions();
  }

  private initMap() {
    this.map = L.map('map', {
      center: [55.751244, 37.618423],
      zoom: 10,
      dragging: true,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.clickedLatLng = e.latlng;
      this.newPointName = '';

      const containerPoint = this.map.latLngToContainerPoint(e.latlng);
      this.formPosition = {
        top: containerPoint.y,
        left: containerPoint.x,
      };

      this.showForm = true;
    });
  }

  private addMarkers(positions: MapPosition[]) {
    this.clearMarkers();
    // console.log('Добавляем маркеры', positions);
    positions.forEach(pos => {
      const lat = parseFloat(pos.latitude as any);
      const lng = parseFloat(pos.longitude as any);

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
        marker.bindTooltip(pos.name, { permanent: false, direction: 'top' });
        this.markers.push(marker);
      } else {
        console.warn('Некорректные координаты:', pos);
      }
    });
  }

  private clearMarkers() {
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];
  }

  savePoint() {
    if (this.newPointName.trim() && this.clickedLatLng) {
      const newPosition = {
        name: this.newPointName.trim(),
        latitude: parseFloat(this.clickedLatLng.lat.toFixed(4)),
        longitude: parseFloat(this.clickedLatLng.lng.toFixed(4)),
      };
      // console.log('Добавляем позицию:', newPosition);

      this.mapService.addPosition(newPosition);
      this.showForm = false;
    }
  }

  cancel() {
    this.showForm = false;
  }
}
