import type { ParkingSpotStatus } from '../../types/parking'
import { parkingSpotStatusLabels, parkingSpotSwatchClasses } from './spotStatus'

const statuses: ParkingSpotStatus[] = ['available', 'occupied', 'out_of_service']

export default function SpotLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
      {statuses.map((status) => (
        <span key={status} className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={`h-3.5 w-3.5 rounded-[4px] ${parkingSpotSwatchClasses[status]}`}
          />
          {parkingSpotStatusLabels[status]}
        </span>
      ))}
    </div>
  )
}
