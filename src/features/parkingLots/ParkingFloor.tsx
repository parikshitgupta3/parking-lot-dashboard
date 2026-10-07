import type {
  ParkingLotFloor,
  ParkingSpot as ParkingSpotData,
  ParkingSpotStatus,
} from '../../types/parking'
import ParkingSpot from './ParkingSpot'

interface ParkingFloorProps {
  floor: ParkingLotFloor
  selectedSpotId?: string
  onSelectSpot: (spot: ParkingSpotData) => void
}

function countBy(spots: ParkingSpotData[], status: ParkingSpotStatus): number {
  return spots.filter((spot) => spot.status === status).length
}

export default function ParkingFloor({
  floor,
  selectedSpotId,
  onSelectSpot,
}: ParkingFloorProps) {
  return (
    <div>
      <p className="mb-3 text-xs text-gray-500">
        {floor.spots.length} spots · {countBy(floor.spots, 'available')}{' '}
        available · {countBy(floor.spots, 'occupied')} occupied ·{' '}
        {countBy(floor.spots, 'out_of_service')} out of service
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
        {floor.spots.map((spot) => (
          <ParkingSpot
            key={spot.id}
            spot={spot}
            selected={spot.id === selectedSpotId}
            onSelect={onSelectSpot}
          />
        ))}
      </div>
    </div>
  )
}
