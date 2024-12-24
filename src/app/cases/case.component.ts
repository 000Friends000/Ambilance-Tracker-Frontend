import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import polyline from '@mapbox/polyline';
import { CaseService } from '../services/case.service';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Case } from '../models/case.model';
@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent implements OnInit {
  map!: mapboxgl.Map;
  cases: Case[] = []; // Array to store all cases

  // Getter for filtered cases
  get filteredCases(): Case[] {
    return this.cases;
  }

  constructor(private caseService: CaseService) {}

  ngOnInit(): void {
    this.initializeMap();
    this.loadCases();
  }

  // Initialize Mapbox
  initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map', // Ensure there's a div with id 'map' in the HTML
      style: 'mapbox://styles/yacinemansour/cm4u3ppqk003d01sa0bch87jn',
      center: [-7.9811, 31.6295],
      zoom: 14,
      accessToken: 'pk.eyJ1IjoieWFjaW5lbWFuc291ciIsImEiOiJjbTRzbTBuZmowMnAxMnBzZ3ozZWNyMTQ1In0.MuCDPa78D1cgrKqm3LDX2Q', // Replace with your Mapbox token
    });
  }

  // Load cases from the backend
  loadCases(): void {
    this.caseService.getAllCases().subscribe({
      next: (data) => {
        // Map `routeGeometry` to `routePolyline`
        this.cases = data.map((caseItem) => ({
          ...caseItem,
          routePolyline: caseItem.routeGeometry, // Map routeGeometry to routePolyline
        }));
      },
      error: (err) => console.error('Error fetching cases:', err),
    });
  }

  // Show the route on the map
  showRoute(encodedPolyline: string | null | undefined): void {
    if (!encodedPolyline || encodedPolyline.trim() === '') {
      console.error('Invalid or empty route polyline:', encodedPolyline);
      return; // Exit the function if the polyline is invalid
    }

    const coordinates: Array<[number, number]> = polyline.decode(encodedPolyline).map((point: [number, number]) => [
      point[1], // Longitude
      point[0], // Latitude
    ]);

    // Remove existing route if present
    if (this.map.getSource('route')) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }

    // Add the route as a GeoJSON source
    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates,
        },
        properties: {},
      } as GeoJSON.Feature<GeoJSON.Geometry>,
    });

    // Add a layer to display the route
    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#ff0000', // Route color
        'line-width': 4,
      },
    });

    // Fit the map to the bounds of the route
    const bounds = coordinates.reduce(
      (bounds: mapboxgl.LngLatBounds, coord: [number, number]) =>
        bounds.extend(coord as mapboxgl.LngLatLike),
      new mapboxgl.LngLatBounds(coordinates[0] as mapboxgl.LngLatLike, coordinates[0] as mapboxgl.LngLatLike)
    );

    this.map.fitBounds(bounds, { padding: 50 });
  }

  // Edit a case (placeholder for logic)
  editCase(caseItem: Case): void {
    console.log('Editing case:', caseItem);
    // Add your editing logic here
  }

  // Remove a case from the list
  removeCase(caseId: number): void {
    this.cases = this.cases.filter((caseItem) => caseItem.id !== caseId);
  }
}
