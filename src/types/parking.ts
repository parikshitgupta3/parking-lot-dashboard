export type TicketStatus = 'active' | 'paid' | 'exited' | 'overdue'

export type VehicleType = 'car' | 'motorcycle' | 'truck'

export interface ParkingSummary {
  totalSpots: number
  occupiedSpots: number
  availableSpots: number
  activeTickets: number
}

export interface ParkingFloor {
  id: string
  name: string
  totalSpots: number
  occupiedSpots: number
}

export interface ParkingActivity {
  id: string
  vehicleNumber: string
  vehicleType: VehicleType
  floorName: string
  spotCode: string
  entryTime: string
  exitTime: string | null
  status: TicketStatus
}

export type ParkingSpotStatus = 'available' | 'occupied' | 'out_of_service'

export type SpotType = 'car' | 'motorcycle' | 'truck' | 'ev'

export interface ParkedVehicle {
  vehicleNumber: string
  vehicleType: VehicleType
  entryTime: string
}

export interface ParkingSpot {
  id: string
  code: string
  status: ParkingSpotStatus
  spotType: SpotType
  vehicle?: ParkedVehicle
}

export interface ParkingLotFloor {
  id: string
  name: string
  spots: ParkingSpot[]
}

export interface ParkingLot {
  id: string
  name: string
  address: string
  floors: ParkingLotFloor[]
}
