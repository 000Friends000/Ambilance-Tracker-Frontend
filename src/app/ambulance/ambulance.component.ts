import { Component, OnInit } from '@angular/core';
import { AmbulanceService } from '../services/ambulance.service';
import { Ambulance } from '../models/ambulance.model';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ambulance',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    HttpClientModule,
    NgIf,
  ],
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.css'],
})
export class AmbulanceComponent implements OnInit {
  ambulances: Ambulance[] = [];
  totalAmbulances = 0;
  availableAmbulances = 0;
  selectedStatus = 'All';
  newAmbulance: { latitude: number; available: boolean; driverName: string; longitude: number } = { driverName: '', available: false, latitude: 0, longitude: 0 };
  updateAmbulance: Ambulance | null = null;
  showModal = false;
  confirmDeleteId: number | null = null;
  constructor(private ambulanceService: AmbulanceService) {}

  ngOnInit(): void {
    this.loadAmbulances();
  }

  loadAmbulances(): void {
    this.ambulanceService.getAllAmbulances().subscribe((data) => {
      this.ambulances = data;
      this.totalAmbulances = data.length;
      this.availableAmbulances = data.filter((a) => a.available).length;
    });
  }

  addAmbulance(): void {
    this.ambulanceService.createAmbulance(this.newAmbulance).subscribe((ambulance) => {
      this.ambulances.push(ambulance);
      this.newAmbulance = {  driverName: '', available: false, latitude: 0, longitude: 0  };
      this.loadAmbulances();
      this.closeModal();
    });
  }

  startUpdate(ambulance: Ambulance): void {
    this.updateAmbulance = { ...ambulance };
    this.showModal = true;
  }

  updateExistingAmbulance(): void {
    if (this.updateAmbulance) {
      this.ambulanceService.updateAmbulance(this.updateAmbulance.id, this.updateAmbulance).subscribe(() => {
        this.loadAmbulances();
        this.updateAmbulance = null;
        this.closeModal();
      });
    }
  }

  confirmDelete(id: number): void {
    this.confirmDeleteId = id;
  }

  deleteAmbulance(): void {
    if (this.confirmDeleteId !== null) {
      this.ambulanceService.deleteAmbulance(this.confirmDeleteId).subscribe(() => {
        this.loadAmbulances();
        this.confirmDeleteId = null;
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.updateAmbulance = null;
  }

  get filteredAmbulances() {
    if (this.selectedStatus === 'All') {
      return this.ambulances;
    }
    const isAvailable = this.selectedStatus === 'Available';
    return this.ambulances.filter((ambulance) => ambulance.available === isAvailable);
  }
}
