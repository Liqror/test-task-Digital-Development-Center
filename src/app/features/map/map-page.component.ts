import { Component, OnInit } from '@angular/core';
import { MapPosition, MapService } from '../../core/map.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit {
  constructor(public mapService: MapService) {}

  ngOnInit() {
    this.mapService.loadPositions();
  }

  onAddPosition(newPos: MapPosition) {
    this.mapService.addPosition(newPos);
  }
}