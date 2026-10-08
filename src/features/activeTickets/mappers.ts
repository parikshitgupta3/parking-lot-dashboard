import type {
  ActiveTicketSummary,
  ParkingSpot as ParkingSpotData,
  SpotType,
  VehicleType,
} from '../../types/parking'
import type {
  ActiveTicketSummaryDto,
  SpotTypeDto,
  VehicleTypeDto,
} from '../../types/parkingLotApi'

const spotTypeMap: Record<SpotTypeDto, SpotType> = {
  BIKE: 'bike',
  COMPACT: 'compact',
  LARGE: 'large',
}

const vehicleTypeMap: Record<VehicleTypeDto, VehicleType> = {
  BIKE: 'bike',
  CAR: 'car',
  TRUCK: 'truck',
}

export function mapActiveTicket(
  dto: ActiveTicketSummaryDto,
): ActiveTicketSummary {
  return {
    ticketId: dto.id,
    licensePlate: dto.vehicleRegistrationNumber,
    vehicleType: vehicleTypeMap[dto.vehicleType],
    spotCode: dto.spotNumber,
    spotType: spotTypeMap[dto.spotType],
    floorName: `Floor ${dto.floorNumber}`,
    lotId: dto.lotId,
    lotName: dto.lotName,
    entryTime: dto.entryTime,
  }
}

/**
 * Builds the spot shape the shared VehicleExitModal expects from an
 * active-ticket row, so the exit workflow is reused unchanged.
 */
export function toSpotForExit(summary: ActiveTicketSummary): ParkingSpotData {
  return {
    id: `${summary.lotId}:${summary.floorName}:${summary.spotCode}`,
    code: summary.spotCode,
    status: 'occupied',
    spotType: summary.spotType,
    ticket: {
      ticketId: summary.ticketId,
      licensePlate: summary.licensePlate,
      vehicleType: summary.vehicleType,
      entryTime: summary.entryTime,
    },
  }
}
