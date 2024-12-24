import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { HospitalService } from '../services/hospital.service';
import { Hospital } from '../models/hospital.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  map!: mapboxgl.Map;
  availableAmbulances: number = 8;
  availableHospitals: number = 5;
  activeCases: number = 3;
  hospitals: Hospital[] = [];

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.initializeMap();
    this.loadHospitalData(); // Load hospital data and add markers after
  }

  initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/yacinemansour/cm4u3ppqk003d01sa0bch87jn',
      center: [-7.9811, 31.6295],
      zoom: 14,
      accessToken: 'pk.eyJ1IjoieWFjaW5lbWFuc291ciIsImEiOiJjbTRzbTBuZmowMnAxMnBzZ3ozZWNyMTQ1In0.MuCDPa78D1cgrKqm3LDX2Q',
    });
  }

  loadHospitalData(): void {
    this.hospitalService.getAllHospitals().subscribe((data) => {
      this.hospitals = data;
      this.addHospitalMarkers(); // Add markers after data is loaded
    });
  }

  addHospitalMarkers(): void {
    // Add markers to the map
    for (const feature of this.hospitals) {
      // Create a DOM element for the marker
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(/icons/hospital.png)';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundSize = 'contain';

      // Create and add the marker
      new mapboxgl.Marker(el)
        .setLngLat([feature.longitude, feature.latitude])
        .addTo(this.map);
    }
  }
}
