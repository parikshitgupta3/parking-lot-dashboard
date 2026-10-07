import { spotTypeMeta } from '../../lib/vehicleMeta'
import type { ParkingSpot as ParkingSpotData } from '../../types/parking'
import { parkingSpotStatusLabels, parkingSpotTileClasses } from './spotStatus'

interface ParkingSpotProps {
  spot: ParkingSpotData
  selected?: boolean
  onSelect: (spot: ParkingSpotData) => void
}

export default function ParkingSpot({
  spot,
  selected = false,
  onSelect,
}: ParkingSpotProps) {
  const { icon: TypeIcon } = spotTypeMeta[spot.spotType]
  const statusLabel = parkingSpotStatusLabels[spot.status]

  return (
    <button
      type="button"
      onClick={() => onSelect(spot)}
      aria-pressed={selected}
      aria-label={`Spot ${spot.code}, ${statusLabel}${
        spot.vehicle ? `, ${spot.vehicle.vehicleNumber}` : ''
      }`}
      className={`flex aspect-square flex-col items-center justify-between gap-1 rounded-lg border p-2 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        parkingSpotTileClasses[spot.status]
      } ${selected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
    >
      <span className="w-full truncate text-xs font-semibold sm:text-sm">
        {spot.code}
      </span>
      {spot.vehicle && (
        <span className="w-full truncate text-[10px] leading-none opacity-80">
          {spot.vehicle.vehicleNumber}
        </span>
      )}
      <TypeIcon className="h-4 w-4 shrink-0" />
    </button>
  )
}
