/**
 * Response DTO contracts for the parking lot REST API, matching the
 * Spring Boot backend's api/dto records exactly:
 *
 *   GET /api/v1/parking-lots                → ParkingLotSummaryDto[]
 *   GET /api/v1/parking-lots/{id}           → ParkingLotDetailsDto
 *   GET /api/v1/parking-lots/{id}/availability → ParkingLotAvailabilityDto
 *
 * Enum values serialize as the Java enum names (SpotStatus, SpotType,
 * VehicleType in domain/enums). Errors are RFC 7807 problem details.
 */

export type SpotStatusDto = 'AVAILABLE' | 'OCCUPIED' | 'OUT_OF_SERVICE'

export type SpotTypeDto = 'BIKE' | 'COMPACT' | 'LARGE'

export type VehicleTypeDto = 'BIKE' | 'CAR' | 'TRUCK'

/** ParkingLotSummaryResponse */
export interface ParkingLotSummaryDto {
  id: string
  name: string
  floorCount: number
  totalSpots: number
}

/** ParkingLotDetailsResponse.SpotResponse */
export interface ParkingSpotDto {
  spotNumber: string
  spotType: SpotTypeDto
  status: SpotStatusDto
}

/** ParkingLotDetailsResponse.FloorResponse */
export interface ParkingFloorDto {
  floorNumber: number
  spots: ParkingSpotDto[]
}

/** ParkingLotDetailsResponse */
export interface ParkingLotDetailsDto {
  id: string
  name: string
  floors: ParkingFloorDto[]
}

/** AvailabilityResponse.AvailableSpotResponse */
export interface AvailableSpotDto {
  floorNumber: number
  spotNumber: string
  spotType: SpotTypeDto
}

/** AvailabilityResponse */
export interface ParkingLotAvailabilityDto {
  availableSpotCount: number
  spots: AvailableSpotDto[]
}

/** Mirrors the backend's TicketStatus enum. */
export type TicketStatusDto = 'ACTIVE' | 'COMPLETED'

/** VehicleEntryRequest */
export interface VehicleEntryRequestDto {
  registrationNumber: string
  vehicleType: VehicleTypeDto
}

/** TicketResponse */
export interface TicketDto {
  id: string
  vehicleRegistrationNumber: string
  vehicleType: VehicleTypeDto
  spotNumber: string
  spotType: SpotTypeDto
  entryTime: string
  exitTime: string | null
  fee: number | null
  status: TicketStatusDto
}
