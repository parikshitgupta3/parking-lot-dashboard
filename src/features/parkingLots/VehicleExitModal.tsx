import { useState } from 'react'
import { CircleCheck } from 'lucide-react'
import { ConfirmDialog, Modal } from '../../components/ui'
import { ApiError } from '../../lib/apiClient'
import { formatDateTime, formatDuration } from '../../lib/format'
import { vehicleTypeMeta } from '../../lib/vehicleMeta'
import { checkoutTicket } from '../../services/ticketService'
import type { ParkingSpot as ParkingSpotData } from '../../types/parking'
import type { TicketDto } from '../../types/parkingLotApi'

interface VehicleExitModalProps {
  /** An occupied spot carrying its active ticket. */
  spot: ParkingSpotData
  floorName?: string
  onClose: () => void
  /** Called once when the backend accepts the exit. */
  onExitSuccess: (ticket: TicketDto) => void
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="shrink-0 text-sm text-gray-500">{label}</span>
      <span className="text-right text-sm font-medium text-gray-900">
        {value}
      </span>
    </div>
  )
}

export default function VehicleExitModal({
  spot,
  floorName,
  onClose,
  onExitSuccess,
}: VehicleExitModalProps) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [receipt, setReceipt] = useState<TicketDto | null>(null)

  const ticket = spot.ticket
  if (!ticket) return null

  const handleConfirm = () => {
    setBusy(true)
    setError(null)

    checkoutTicket(ticket.ticketId)
      .then((completed) => {
        setReceipt(completed)
        onExitSuccess(completed)
      })
      .catch((caught: unknown) => {
        setError(
          caught instanceof ApiError
            ? caught.message
            : 'Something went wrong while checking out the vehicle.',
        )
      })
      .finally(() => setBusy(false))
  }

  if (receipt) {
    const vehicleLabel =
      vehicleTypeMeta[receipt.vehicleType.toLowerCase() as 'bike' | 'car' | 'truck'].label
    const parkedFor = receipt.exitTime
      ? formatDuration(receipt.entryTime, new Date(receipt.exitTime).getTime())
      : formatDuration(receipt.entryTime)

    return (
      <Modal title="Vehicle exited" onClose={onClose}>
        <div className="p-5">
          <div className="flex items-center gap-2.5 rounded-lg bg-emerald-50 p-3 text-emerald-700">
            <CircleCheck className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">
              Spot {receipt.spotNumber} is available again.
            </p>
          </div>

          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
            <p className="text-xs font-medium text-gray-500">Parking fee</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {receipt.fee !== null ? receipt.fee.toFixed(2) : '—'}
            </p>
          </div>

          <div className="mt-2 divide-y divide-gray-100">
            <DetailRow
              label="Exit time"
              value={receipt.exitTime ? formatDateTime(receipt.exitTime) : '—'}
            />
            <DetailRow label="Parked for" value={parkedFor} />
            <DetailRow
              label="Spot"
              value={`${receipt.spotNumber}${floorName ? ` · ${floorName}` : ''}`}
            />
            <DetailRow
              label="Vehicle"
              value={`${receipt.vehicleRegistrationNumber} · ${vehicleLabel}`}
            />
            <DetailRow label="Ticket" value={receipt.id} />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Done
          </button>
        </div>
      </Modal>
    )
  }

  const vehicleTypeLabel = vehicleTypeMeta[ticket.vehicleType].label

  return (
    <ConfirmDialog
      title="Exit vehicle"
      message="Check out the vehicle and free the spot?"
      details={[
        { label: 'Ticket', value: ticket.ticketId },
        {
          label: 'Vehicle',
          value: `${ticket.licensePlate} · ${vehicleTypeLabel}`,
        },
        {
          label: 'Spot',
          value: `${spot.code}${floorName ? ` · ${floorName}` : ''}`,
        },
        { label: 'Entry time', value: formatDateTime(ticket.entryTime) },
        { label: 'Parked for', value: formatDuration(ticket.entryTime) },
      ]}
      confirmLabel="Confirm exit"
      busy={busy}
      error={error}
      onConfirm={handleConfirm}
      onClose={onClose}
    />
  )
}
