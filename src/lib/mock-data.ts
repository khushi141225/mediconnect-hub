// Mock data for MediSync prototype

export type UserRole = 'hospital_admin' | 'ambulance_coordinator' | 'doctor';

export interface Hospital {
  id: string;
  name: string;
  type: 'government' | 'private';
  lat: number;
  lng: number;
  distance?: number;
  icuBeds: { total: number; available: number };
  generalBeds: { total: number; available: number };
  ventilators: { total: number; available: number };
  operationTheatres: { total: number; available: number };
  ambulances: { total: number; available: number };
  status: 'available' | 'limited' | 'overloaded';
  emergencyLoad: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  hospitalId: string;
  available: boolean;
  consultationMode: 'in-person' | 'telemedicine' | 'both';
  avatar?: string;
}

export interface ResourceRequest {
  id: string;
  fromHospital: string;
  toHospital: string;
  resourceType: string;
  quantity: number;
  urgency: 'critical' | 'high' | 'medium';
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'emergency' | 'request' | 'shortage' | 'approval' | 'surplus';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface EmergencyCase {
  id: string;
  type: string;
  patientCondition: string;
  location: string;
  timestamp: string;
  status: 'scanning' | 'assigned' | 'in_transit' | 'arrived';
  assignedHospital?: string;
  decision?: 'treat' | 'request_resources' | 'transfer';
}

export const hospitals: Hospital[] = [
  {
    id: 'h1', name: 'City General Hospital', type: 'government',
    lat: 28.6139, lng: 77.2090, distance: 2.3,
    icuBeds: { total: 40, available: 8 },
    generalBeds: { total: 200, available: 45 },
    ventilators: { total: 25, available: 6 },
    operationTheatres: { total: 8, available: 3 },
    ambulances: { total: 12, available: 4 },
    status: 'available', emergencyLoad: 62,
  },
  {
    id: 'h2', name: 'Metro Private Medical Center', type: 'private',
    lat: 28.6280, lng: 77.2200, distance: 4.1,
    icuBeds: { total: 30, available: 2 },
    generalBeds: { total: 150, available: 12 },
    ventilators: { total: 20, available: 1 },
    operationTheatres: { total: 6, available: 1 },
    ambulances: { total: 8, available: 2 },
    status: 'limited', emergencyLoad: 88,
  },
  {
    id: 'h3', name: 'District Public Hospital', type: 'government',
    lat: 28.5900, lng: 77.1900, distance: 5.8,
    icuBeds: { total: 20, available: 0 },
    generalBeds: { total: 100, available: 5 },
    ventilators: { total: 10, available: 0 },
    operationTheatres: { total: 4, available: 0 },
    ambulances: { total: 6, available: 1 },
    status: 'overloaded', emergencyLoad: 97,
  },
  {
    id: 'h4', name: 'Sunrise Multispecialty Hospital', type: 'private',
    lat: 28.6350, lng: 77.2400, distance: 6.2,
    icuBeds: { total: 50, available: 18 },
    generalBeds: { total: 250, available: 80 },
    ventilators: { total: 35, available: 12 },
    operationTheatres: { total: 10, available: 5 },
    ambulances: { total: 15, available: 7 },
    status: 'available', emergencyLoad: 35,
  },
  {
    id: 'h5', name: 'National Trauma Center', type: 'government',
    lat: 28.6000, lng: 77.2300, distance: 3.5,
    icuBeds: { total: 60, available: 5 },
    generalBeds: { total: 300, available: 22 },
    ventilators: { total: 40, available: 3 },
    operationTheatres: { total: 12, available: 2 },
    ambulances: { total: 20, available: 3 },
    status: 'limited', emergencyLoad: 78,
  },
];

export const doctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Aanya Sharma', specialty: 'Cardiologist', hospital: 'City General Hospital', hospitalId: 'h1', available: true, consultationMode: 'both' },
  { id: 'd2', name: 'Dr. Rajesh Patel', specialty: 'Neurosurgeon', hospital: 'Metro Private Medical Center', hospitalId: 'h2', available: false, consultationMode: 'in-person' },
  { id: 'd3', name: 'Dr. Priya Menon', specialty: 'Trauma Surgeon', hospital: 'National Trauma Center', hospitalId: 'h5', available: true, consultationMode: 'both' },
  { id: 'd4', name: 'Dr. Vikram Singh', specialty: 'Pulmonologist', hospital: 'Sunrise Multispecialty Hospital', hospitalId: 'h4', available: true, consultationMode: 'telemedicine' },
  { id: 'd5', name: 'Dr. Fatima Khan', specialty: 'Anesthesiologist', hospital: 'City General Hospital', hospitalId: 'h1', available: true, consultationMode: 'in-person' },
  { id: 'd6', name: 'Dr. Arjun Reddy', specialty: 'Orthopedic Surgeon', hospital: 'District Public Hospital', hospitalId: 'h3', available: false, consultationMode: 'both' },
  { id: 'd7', name: 'Dr. Sneha Iyer', specialty: 'Emergency Medicine', hospital: 'National Trauma Center', hospitalId: 'h5', available: true, consultationMode: 'both' },
  { id: 'd8', name: 'Dr. Mohammed Ali', specialty: 'Cardiologist', hospital: 'Sunrise Multispecialty Hospital', hospitalId: 'h4', available: true, consultationMode: 'telemedicine' },
];

export const resourceRequests: ResourceRequest[] = [
  { id: 'r1', fromHospital: 'District Public Hospital', toHospital: 'City General Hospital', resourceType: 'Ventilators', quantity: 3, urgency: 'critical', status: 'pending', timestamp: '2 min ago' },
  { id: 'r2', fromHospital: 'Metro Private Medical Center', toHospital: 'Sunrise Multispecialty Hospital', resourceType: 'ICU Beds', quantity: 5, urgency: 'high', status: 'pending', timestamp: '8 min ago' },
  { id: 'r3', fromHospital: 'National Trauma Center', toHospital: 'City General Hospital', resourceType: 'Trauma Surgeon', quantity: 1, urgency: 'critical', status: 'approved', timestamp: '15 min ago' },
  { id: 'r4', fromHospital: 'District Public Hospital', toHospital: 'Sunrise Multispecialty Hospital', resourceType: 'Ambulances', quantity: 2, urgency: 'medium', status: 'rejected', timestamp: '1 hr ago' },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'emergency', message: 'CRITICAL: Multi-vehicle accident on NH-44. 12 casualties reported.', timestamp: '1 min ago', read: false },
  { id: 'n2', type: 'shortage', message: 'District Public Hospital: ICU beds at 0. Ventilators at 0.', timestamp: '3 min ago', read: false },
  { id: 'n3', type: 'request', message: 'Resource request: 3 ventilators from District Public Hospital.', timestamp: '5 min ago', read: false },
  { id: 'n4', type: 'approval', message: 'Trauma Surgeon deployment approved by City General Hospital.', timestamp: '15 min ago', read: true },
  { id: 'n5', type: 'surplus', message: 'Sunrise Multispecialty: 7 idle ventilators available for sharing.', timestamp: '22 min ago', read: true },
  { id: 'n6', type: 'emergency', message: 'Cardiac arrest patient en route to Metro Private Medical Center.', timestamp: '30 min ago', read: true },
];

export const emergencyTypes = [
  'Cardiac Arrest', 'Stroke', 'Trauma', 'Accident', 'Burns', 'Respiratory Failure', 'Poisoning', 'Obstetric Emergency',
];

export const analyticsData = {
  icuUtilization: [
    { name: 'City General', utilization: 80 },
    { name: 'Metro Private', utilization: 93 },
    { name: 'District Public', utilization: 100 },
    { name: 'Sunrise Multi', utilization: 64 },
    { name: 'National Trauma', utilization: 92 },
  ],
  hourlyLoad: [
    { hour: '00:00', load: 45 }, { hour: '02:00', load: 38 }, { hour: '04:00', load: 32 },
    { hour: '06:00', load: 48 }, { hour: '08:00', load: 65 }, { hour: '10:00', load: 78 },
    { hour: '12:00', load: 82 }, { hour: '14:00', load: 75 }, { hour: '16:00', load: 88 },
    { hour: '18:00', load: 92 }, { hour: '20:00', load: 85 }, { hour: '22:00', load: 60 },
  ],
  responseTimeTrend: [
    { day: 'Mon', avgMinutes: 8.2 }, { day: 'Tue', avgMinutes: 7.5 }, { day: 'Wed', avgMinutes: 9.1 },
    { day: 'Thu', avgMinutes: 6.8 }, { day: 'Fri', avgMinutes: 10.2 }, { day: 'Sat', avgMinutes: 11.5 },
    { day: 'Sun', avgMinutes: 7.8 },
  ],
  equipmentUsage: [
    { name: 'Ventilators', used: 78, total: 130 },
    { name: 'ICU Beds', used: 167, total: 200 },
    { name: 'General Beds', used: 836, total: 1000 },
    { name: 'Op. Theatres', used: 29, total: 40 },
    { name: 'Ambulances', used: 44, total: 61 },
  ],
};
