import type { ParkingFloor } from '../../types/parking'
import { SectionCard } from '../../components/ui'

interface FloorOverviewProps {
  floors: ParkingFloor[]
}

function LegendSwatch({ className }: { className: string }) {
  return <span className={`h-2.5 w-2.5 rounded-full ${className}`} />
}

export default function FloorOverview({ floors }: FloorOverviewProps) {
  return (
    <SectionCard
      title="Floor Overview"
      className="h-full"
      action={
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <LegendSwatch className="bg-indigo-500" />
            Occupied
          </span>
          <span className="flex items-center gap-1.5">
            <LegendSwatch className="bg-indigo-200" />
            Available
          </span>
        </div>
      }
    >
      <ul className="space-y-5">
        {floors.map((floor) => {
          const available = floor.totalSpots - floor.occupiedSpots
          const occupiedPct = (floor.occupiedSpots / floor.totalSpots) * 100
          const availablePct = 100 - occupiedPct

          return (
            <li key={floor.id}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-gray-900">{floor.name}</span>
                {/* Counts stay visible as text — the light track step is
                    sub-contrast, so no value is carried by color alone. */}
                <span className="whitespace-nowrap text-gray-500">
                  <span className="font-medium text-gray-900">
                    {floor.occupiedSpots}
                  </span>{' '}
                  occupied ·{' '}
                  <span className="font-medium text-gray-900">{available}</span>{' '}
                  available
                </span>
              </div>
              <div
                className="flex h-2.5 w-full gap-0.5"
                role="img"
                aria-label={`${floor.name}: ${floor.occupiedSpots} occupied, ${available} available of ${floor.totalSpots} spots`}
              >
                <div
                  className="rounded-full bg-indigo-500"
                  style={{ width: `${occupiedPct}%` }}
                />
                {available > 0 && (
                  <div
                    className="rounded-full bg-indigo-200"
                    style={{ width: `${availablePct}%` }}
                  />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </SectionCard>
  )
}
