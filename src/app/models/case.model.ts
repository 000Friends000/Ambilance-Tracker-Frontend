export interface Case {
  id: number;
  latitude: number;
  longitude: number;
  specialization: string;
  status: string;
  assignedAmbulanceId: number;
  assignedHospitalId: number;
  estimatedDuration: number;
  estimatedDistance: number;
  routeGeometry: string;
  realDuration: number | null;
  createdAt: string;
  routePolyline: string;
}
