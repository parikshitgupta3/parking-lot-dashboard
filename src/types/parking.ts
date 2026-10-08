export type TicketStatus = 'active' | 'paid' | 'exited' | 'overdue'

/** Mirrors the backend's VehicleType enum, lowercased for the UI. */
export type VehicleType = 'bike' | 'car' | 'truck'

/** Mirrors the backend's SpotType enum, lowercased for the UI. */
export type SpotType = 'bike' | 'compact' | 'large'

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

/** Mirrors the backend's SpotStatus enum, lowercased for the UI. */
export type ParkingSpotStatus = 'available' | 'occupied' | 'out_of_service'

/** The active ticket occupying a spot. */
export interface ActiveTicket {
  ticketId: string
  licensePlate: string
  vehicleType: VehicleType
  entryTime: string
}

export interface ParkingSpot {
  /** Derived: unique within a lot (`floorNumber:spotNumber`). */
  id: string
  /** The backend's spotNumber (e.g. "A-01"). */
  code: string
  status: ParkingSpotStatus
  spotType: SpotType
  ticket?: ActiveTicket
}

export interface ParkingLotFloor {
  /** Derived (`lotId:floor:N`). */
  id: string
  /** Derived display name ("Floor 1"). */
  name: string
  floorNumber: number
  spots: ParkingSpot[]
}

export interface ParkingLot {
  id: string
  name: string
  floors: ParkingLotFloor[]
}

export interface ParkingLotSummary {
  id: string
  name: string
  floorCount: number
  totalSpots: number
}

export interface ParkingLotAvailability {
  availableSpotCount: number
}

/** One row of the active-tickets list, with the spot's location joined in. */
export interface ActiveTicketSummary {
  ticketId: string
  licensePlate: string
  vehicleType: VehicleType
  spotCode: string
  spotType: SpotType
  floorName: string
  lotId: string
  lotName: string
  entryTime: string
}
