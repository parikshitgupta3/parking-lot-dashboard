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
