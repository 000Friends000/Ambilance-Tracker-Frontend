import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  private baseUrl = 'http://localhost:8888/dispatch-coordination-service'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  // Method to handle emergency and fetch route
  handleEmergency(emergencyRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/handle-emergency`, emergencyRequest);
  }
}
