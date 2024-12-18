import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  availableAmbulances = 12;
  availableHospitals = 8;
  emergencyCases = 5;
  apiKey = 'AIzaSyBSekYR5jzfKc5ZA2JUkPb72AWIryqcf_E'; // Replace with your actual API key

  ngOnInit(): void {
    this.loadGoogleMapsApi().then(() => {
      this.initMap();
    }).catch(error => {
      console.error('Error loading Google Maps API:', error);
    });
  }

  loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    });
  }

  initMap(): void {
    const google = (window as any).google; // Add this line to resolve the google reference

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 31.6295, lng: -7.9811 }, // Center the map on Marrakech
      zoom: 13,
    });

    const markers = [
      { position: { lat: 31.6295, lng: -7.9811 }, title: 'Ambulance 1', icon: 'https://cdn-icons-png.flaticon.com/128/9193/9193077.png' },
      { position: { lat: 31.6335, lng: -7.9889 }, title: 'Ambulance 2', icon: 'https://maps.google.com/mapfiles/kml/shapes/ambulance.png' },
      { position: { lat: 31.6200, lng: -7.9700 }, title: 'Hospital 1', icon: 'https://maps.google.com/mapfiles/kml/shapes/hospitals.png' },
    ];

    markers.forEach(markerData => {
      new google.maps.Marker({
        position: markerData.position,
        map,
        title: markerData.title,
        icon: markerData.icon,
      });
    });
  }
}
