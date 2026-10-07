import type {
  ParkedVehicle,
  ParkingLot,
  ParkingLotFloor,
  ParkingSpot,
  ParkingSpotStatus,
  SpotType,
  VehicleType,
} from '../../types/parking'

const plates = [
  'MH 04 GK 5521',
  'KA 05 MN 8112',
  'DL 01 CD 4402',
  'TS 09 EF 7741',
  'AP 28 GX 3096',
  'MH 12 QR 6633',
  'GJ 01 KL 9820',
  'UP 32 ZT 1508',
  'BR 01 PA 2277',
  'TN 22 BQ 9034',
]

const minutesAgo = (minutes: number): string =>
  new Date(Date.now() - minutes * 60_000).toISOString()

/** Deterministic spot-type mix so the grid is varied but stable per floor. */
function spotTypeFor(index: number): SpotType {
  if (index % 9 === 4) return 'motorcycle'
  if (index % 10 === 7) return 'truck'
  if (index % 8 === 3) return 'ev'
  return 'car'
}

/** Deterministic status mix: ~55% available, ~40% occupied, ~5% out of service. */
function statusFor(index: number, offset: number): ParkingSpotStatus {
  const n = (index * 7 + offset * 11) % 20
  if (n === 5) return 'out_of_service'
  if (n < 9) return 'occupied'
  return 'available'
}

function vehicleFor(
  spotType: SpotType,
  index: number,
  offset: number,
): ParkedVehicle {
  const vehicleType: VehicleType =
    spotType === 'motorcycle'
      ? 'motorcycle'
      : spotType === 'truck'
        ? 'truck'
        : 'car'

  return {
    vehicleNumber: plates[(index + offset) % plates.length],
    vehicleType,
    entryTime: minutesAgo(((index * 17 + offset * 7) % 230) + 12),
  }
}

interface FloorSpec {
  id: string
  name: string
  rows: number
  columns: number
  prefix: string
}

function buildFloor(lotId: string, spec: FloorSpec, offset: number): ParkingLotFloor {
  const count = spec.rows * spec.columns

  const spots: ParkingSpot[] = Array.from({ length: count }, (_, index) => {
    const spotType = spotTypeFor(index)
    const status = statusFor(index, offset)

    return {
      id: `${lotId}-${spec.id}-${index + 1}`,
      code: `${spec.prefix}-${String(index + 1).padStart(2, '0')}`,
      status,
      spotType,
      vehicle:
        status === 'occupied' ? vehicleFor(spotType, index, offset) : undefined,
    }
  })

  return { id: `${lotId}-${spec.id}`, name: spec.name, spots }
}

export const mockParkingLots: ParkingLot[] = [
  {
    id: 'central-plaza',
    name: 'Central Plaza Parking',
    address: '12 MG Road, Pune',
    floors: [
      buildFloor(
        'central-plaza',
        { id: 'ground', name: 'Ground Floor', rows: 4, columns: 8, prefix: 'G' },
        1,
      ),
      buildFloor(
        'central-plaza',
        { id: 'floor-1', name: 'Floor 1', rows: 3, columns: 8, prefix: 'A' },
        2,
      ),
      buildFloor(
        'central-plaza',
        { id: 'floor-2', name: 'Floor 2', rows: 3, columns: 8, prefix: 'B' },
        3,
      ),
    ],
  },
  {
    id: 'tech-park',
    name: 'Tech Park Basement',
    address: 'Sector 22, Hinjewadi, Pune',
    floors: [
      buildFloor(
        'tech-park',
        { id: 'basement-1', name: 'Basement 1', rows: 4, columns: 6, prefix: 'P' },
        4,
      ),
      buildFloor(
        'tech-park',
        { id: 'basement-2', name: 'Basement 2', rows: 4, columns: 6, prefix: 'Q' },
        5,
      ),
    ],
  },
  {
    id: 'airport-express',
    name: 'Airport Express Lot',
    address: 'Terminal 2, Lohegaon Airport, Pune',
    floors: [
      buildFloor(
        'airport-express',
        { id: 'ground', name: 'Ground Floor', rows: 5, columns: 8, prefix: 'G' },
        6,
      ),
      buildFloor(
        'airport-express',
        { id: 'floor-1', name: 'Floor 1', rows: 4, columns: 8, prefix: 'A' },
        7,
      ),
    ],
  },
]
