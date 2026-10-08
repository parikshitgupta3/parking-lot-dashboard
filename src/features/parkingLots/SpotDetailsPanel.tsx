import type { ReactNode } from 'react'
import { Ban, LogOut, MousePointerClick } from 'lucide-react'
import { SectionCard, StatusBadge } from '../../components/ui'
import { formatDateTime, formatDuration } from '../../lib/format'
import { spotTypeMeta, vehicleTypeMeta } from '../../lib/vehicleMeta'
import type { ParkingSpot as ParkingSpotData } from '../../types/parking'
import { parkingSpotStatusLabels } from './spotStatus'

interface SpotDetailsPanelProps {
  spot: ParkingSpotData | null
  floorName?: string
  /** When provided for an occupied spot, shows the exit action. */
  onExit?: (spot: ParkingSpotData) => void
  className?: string
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="shrink-0 text-sm text-gray-500">{label}</span>
      <span className="text-right text-sm font-medium text-gray-900">
        {value}
      </span>
    </div>
  )
}

export default function SpotDetailsPanel({
  spot,
  floorName,
  onExit,
  className = '',
}: SpotDetailsPanelProps) {
  if (!spot) {
    return (
      <SectionCard title="Spot details" className={className}>
        <div className="flex flex-col items-center py-10 text-center">
          <MousePointerClick className="h-8 w-8 text-gray-300" />
          <p className="mt-3 max-w-52 text-sm text-gray-500">
            Select a spot on the floor to view its details.
          </p>
        </div>
      </SectionCard>
    )
  }

  const { label: typeLabel, icon: TypeIcon } = spotTypeMeta[spot.spotType]
  const ticket = spot.ticket
  const vehicleMeta = ticket ? vehicleTypeMeta[ticket.vehicleType] : null

  return (
    <SectionCard title="Spot details" className={className}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-mono text-xl font-semibold text-gray-900">
          {spot.code}
        </p>
        <StatusBadge
          variant={spot.status}
          label={parkingSpotStatusLabels[spot.status]}
        />
      </div>

      <div className="divide-y divide-gray-100">
        <DetailRow
          label="Type"
          value={
            <span className="flex items-center gap-1.5">
              <TypeIcon className="h-4 w-4 text-gray-400" />
              {typeLabel}
            </span>
          }
        />
        {floorName && <DetailRow label="Floor" value={floorName} />}
      </div>

      {ticket ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h4 className="text-xs font-semibold text-gray-500">
            Parked vehicle
          </h4>
          <div className="divide-y divide-gray-200/60">
            <DetailRow
              label="License plate"
              value={<span className="font-mono">{ticket.licensePlate}</span>}
            />
            <DetailRow
              label="Vehicle type"
              value={
                vehicleMeta && (
                  <span className="flex items-center gap-1.5">
                    <vehicleMeta.icon className="h-4 w-4 text-gray-400" />
                    {vehicleMeta.label}
                  </span>
                )
              }
            />
            <DetailRow
              label="Entry time"
              value={formatDateTime(ticket.entryTime)}
            />
            <DetailRow
              label="Parked for"
              value={formatDuration(ticket.entryTime)}
            />
            <DetailRow
              label="Ticket"
              value={<span className="font-mono">{ticket.ticketId}</span>}
            />
          </div>
          {onExit && (
            <button
              type="button"
              onClick={() => onExit(spot)}
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <LogOut className="h-4 w-4" />
              Exit vehicle
            </button>
          )}
        </div>
      ) : spot.status === 'out_of_service' ? (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-gray-100 p-3 text-sm text-gray-600">
          <Ban className="mt-0.5 h-4 w-4 shrink-0" />
          This spot is out of service and cannot accept vehicles.
        </div>
      ) : (
        <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          Free — no vehicle is currently parked here.
        </div>
      )}
    </SectionCard>
  )
}
