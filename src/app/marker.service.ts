import { PopupService } from './popup.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(private http: HttpClient, private popupService: PopupService) { }

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((data: any) => {
      const capitals = data.features;
      for (let i = 0; i < capitals.length; i++) {
        const capital = capitals[i];
        const marker = L.marker([capital.geometry.coordinates[1], capital.geometry.coordinates[0]]);
        marker.bindPopup(capital.properties.name);
        marker.addTo(map);
      }
    });
  }

  makeCircleMarker(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) =>{

      const maxPop = Math.max(...res.features.map((x: { properties: { population: number; }; }) => x.properties.population), 0);

      for (const c of res.features){
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaledRadius(c.properties.population, maxPop)
        });

        circle.bindPopup(this.popupService.makeCapitalPopups(c));
        circle.addTo(map);
      }
    })
  }
}
