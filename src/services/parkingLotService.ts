import { apiGet } from '../lib/apiClient'
import type {
  ParkingLotAvailabilityDto,
  ParkingLotDetailsDto,
  ParkingLotSummaryDto,
} from '../types/parkingLotApi'

const BASE_PATH = '/api/v1/parking-lots'

/** GET /api/v1/parking-lots — all lots with headline counts. */
export function fetchParkingLots(
  signal?: AbortSignal,
): Promise<ParkingLotSummaryDto[]> {
  return apiGet<ParkingLotSummaryDto[]>(BASE_PATH, signal)
}

/** GET /api/v1/parking-lots/{id} — one lot with floors and spots. */
export function fetchParkingLot(
  id: string,
  signal?: AbortSignal,
): Promise<ParkingLotDetailsDto> {x
  return apiGet<ParkingLotDetailsDto>(
    `${BASE_PATH}/${encodeURIComponent(id)}`,
    signal,
  )
}

/** GET /api/v1/parking-lots/{id}/availability — live availability counts. */
export function fetchParkingLotAvailability(
  id: string,
  signal?: AbortSignal,
): Promise<ParkingLotAvailabilityDto> {
  return apiGet<ParkingLotAvailabilityDto>(
    `${BASE_PATH}/${encodeURIComponent(id)}/availability`,
    signal,
  )
}
