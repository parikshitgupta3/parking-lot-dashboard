import type {
  ParkingLot,
  ParkingLotAvailability,
  ParkingLotSummary,
  ParkingSpotStatus,
  SpotType,
} from '../../types/parking'
import type {
  ParkingLotAvailabilityDto,
  ParkingLotDetailsDto,
  ParkingLotSummaryDto,
  SpotStatusDto,
  SpotTypeDto,
} from '../../types/parkingLotApi'

const spotStatusMap: Record<SpotStatusDto, ParkingSpotStatus> = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  OUT_OF_SERVICE: 'out_of_service',
}

const spotTypeMap: Record<SpotTypeDto, SpotType> = {
  BIKE: 'bike',
  COMPACT: 'compact',
  LARGE: 'large',
}

export function mapParkingLotSummary(dto: ParkingLotSummaryDto): ParkingLotSummary {
  return {
    id: dto.id,
    name: dto.name,
    floorCount: dto.floorCount,
    totalSpots: dto.totalSpots,
  }
}

export function mapParkingLotDetails(dto: ParkingLotDetailsDto): ParkingLot {
  return {
    id: dto.id,
    name: dto.name,
    floors: dto.floors.map((floor) => ({
      id: `${dto.id}:floor:${floor.floorNumber}`,
      name: `Floor ${floor.floorNumber}`,
      floorNumber: floor.floorNumber,
      spots: floor.spots.map((spot) => ({
        id: `${floor.floorNumber}:${spot.spotNumber}`,
        code: spot.spotNumber,
        status: spotStatusMap[spot.status],
        spotType: spotTypeMap[spot.spotType],
      })),
    })),
  }
}

export function mapParkingLotAvailability(
  dto: ParkingLotAvailabilityDto,
): ParkingLotAvailability {
  return { availableSpotCount: dto.availableSpotCount }
}
