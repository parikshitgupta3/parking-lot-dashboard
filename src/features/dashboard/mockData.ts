import type {
  ParkingActivity,
  ParkingFloor,
  ParkingSummary,
} from '../../types/parking'

const minutesAgo = (minutes: number): string =>
  new Date(Date.now() - minutes * 60_000).toISOString()

export const mockSummary: ParkingSummary = {
  totalSpots: 350,
  occupiedSpots: 245,
  availableSpots: 105,
  activeTickets: 38,
}

// Floor totals/occupied sum to mockSummary (350 / 245).
export const mockFloors: ParkingFloor[] = [
  { id: 'ground', name: 'Ground Floor', totalSpots: 90, occupiedSpots: 70 },
  { id: 'floor-1', name: 'Floor 1', totalSpots: 80, occupiedSpots: 62 },
  { id: 'floor-2', name: 'Floor 2', totalSpots: 90, occupiedSpots: 58 },
  { id: 'floor-3', name: 'Floor 3', totalSpots: 90, occupiedSpots: 55 },
]

export const mockRecentActivity: ParkingActivity[] = [
  {
    id: 't-1041',
    vehicleNumber: 'MH 04 GK 5521',
    vehicleType: 'car',
    floorName: 'Floor 1',
    spotCode: 'A-14',
    entryTime: minutesAgo(25),
    exitTime: null,
    status: 'active',
  },
  {
    id: 't-1040',
    vehicleNumber: 'KA 05 MN 8112',
    vehicleType: 'bike',
    floorName: 'Ground Floor',
    spotCode: 'G-32',
    entryTime: minutesAgo(48),
    exitTime: null,
    status: 'active',
  },
  {
    id: 't-1039',
    vehicleNumber: 'DL 01 CD 4402',
    vehicleType: 'car',
    floorName: 'Floor 2',
    spotCode: 'B-08',
    entryTime: minutesAgo(95),
    exitTime: null,
    status: 'overdue',
  },
  {
    id: 't-1038',
    vehicleNumber: 'TS 09 EF 7741',
    vehicleType: 'truck',
    floorName: 'Floor 3',
    spotCode: 'C-21',
    entryTime: minutesAgo(140),
    exitTime: null,
    status: 'paid',
  },
  {
    id: 't-1037',
    vehicleNumber: 'AP 28 GX 3096',
    vehicleType: 'car',
    floorName: 'Ground Floor',
    spotCode: 'G-05',
    entryTime: minutesAgo(210),
    exitTime: minutesAgo(35),
    status: 'exited',
  },
  {
    id: 't-1036',
    vehicleNumber: 'MH 12 QR 6633',
    vehicleType: 'bike',
    floorName: 'Floor 1',
    spotCode: 'A-41',
    entryTime: minutesAgo(260),
    exitTime: minutesAgo(120),
    status: 'exited',
  },
  {
    id: 't-1035',
    vehicleNumber: 'GJ 01 KL 9820',
    vehicleType: 'car',
    floorName: 'Floor 2',
    spotCode: 'B-27',
    entryTime: minutesAgo(320),
    exitTime: minutesAgo(185),
    status: 'exited',
  },
  {
    id: 't-1034',
    vehicleNumber: 'UP 32 ZT 1508',
    vehicleType: 'car',
    floorName: 'Ground Floor',
    spotCode: 'G-18',
    entryTime: minutesAgo(380),
    exitTime: minutesAgo(240),
    status: 'exited',
  },
]
