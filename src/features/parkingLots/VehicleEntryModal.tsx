import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Car, CircleCheck, Loader2, TriangleAlert } from 'lucide-react'
import { Modal } from '../../components/ui'
import { ApiError } from '../../lib/apiClient'
import { formatDateTime } from '../../lib/format'
import { spotTypeMeta, vehicleTypeMeta } from '../../lib/vehicleMeta'
import { admitVehicle } from '../../services/parkingLotService'
import type { SpotType, VehicleType } from '../../types/parking'
import type { TicketDto, VehicleTypeDto } from '../../types/parkingLotApi'

const vehicleTypeOptions = (
  Object.keys(vehicleTypeMeta) as VehicleType[]
).map((type) => ({
  value: type.toUpperCase() as VehicleTypeDto,
  label: vehicleTypeMeta[type].label,
}))

interface VehicleEntryModalProps {
  lotId: string
  lotName?: string
  onClose: () => void
  /** Called once when the backend accepts the entry. */
  onEntrySuccess: (ticket: TicketDto) => void
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

export default function VehicleEntryModal({
  lotId,
  lotName,
  onClose,
  onEntrySuccess,
}: VehicleEntryModalProps) {
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [vehicleType, setVehicleType] = useState<VehicleTypeDto>('CAR')
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [ticket, setTicket] = useState<TicketDto | null>(null)
  const registrationInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    registrationInputRef.current?.focus()
  }, [])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = registrationNumber.trim()
    if (trimmed.length === 0) {
      setFieldError('Registration number is required.')
      registrationInputRef.current?.focus()
      return
    }

    setFieldError(null)
    setSubmitError(null)
    setSubmitting(true)

    admitVehicle(lotId, { registrationNumber: trimmed, vehicleType })
      .then((created) => {
        setTicket(created)
        onEntrySuccess(created)
      })
      .catch((error: unknown) => {
        setSubmitError(
          error instanceof ApiError
            ? error.message
            : 'Something went wrong while admitting the vehicle.',
        )
      })
      .finally(() => setSubmitting(false))
  }

  if (ticket) {
    const spotTypeLabel =
      spotTypeMeta[ticket.spotType.toLowerCase() as SpotType].label

    return (
      <Modal title="Vehicle entered" onClose={onClose}>
        <div className="p-5">
          <div className="flex items-center gap-2.5 rounded-lg bg-emerald-50 p-3 text-emerald-700">
            <CircleCheck className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">
              Ticket created — spot {ticket.spotNumber} is now occupied.
            </p>
          </div>

          <div className="mt-4 divide-y divide-gray-100">
            <DetailRow
              label="Spot"
              value={`${ticket.spotNumber} · ${spotTypeLabel}`}
            />
            <DetailRow
              label="Vehicle"
              value={`${ticket.vehicleRegistrationNumber} · ${vehicleTypeMeta[ticket.vehicleType.toLowerCase() as VehicleType].label}`}
            />
            <DetailRow label="Entry time" value={formatDateTime(ticket.entryTime)} />
            <DetailRow
              label="Ticket"
              value={ticket.id}
            />
            <DetailRow label="Fee" value="Settles at exit" />
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

  return (
    <Modal
      title={lotName ? `Enter vehicle · ${lotName}` : 'Enter vehicle'}
      onClose={onClose}
      dismissible={!submitting}
    >
      <form onSubmit={handleSubmit} className="space-y-4 p-5" noValidate>
        <div>
          <label
            htmlFor="registration-number"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Registration number
          </label>
          <input
            ref={registrationInputRef}
            id="registration-number"
            type="text"
            value={registrationNumber}
            onChange={(event) => {
              setRegistrationNumber(event.target.value)
              if (fieldError) setFieldError(null)
            }}
            placeholder="e.g. MH 04 GK 5521"
            aria-invalid={fieldError !== null}
            className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
              fieldError
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {fieldError && (
            <p className="mt-1 text-xs text-red-600">{fieldError}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="vehicle-type"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Vehicle type
          </label>
          <select
            id="vehicle-type"
            value={vehicleType}
            onChange={(event) =>
              setVehicleType(event.target.value as VehicleTypeDto)
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {vehicleTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {submitError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {submitError}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Car className="h-4 w-4" />
            )}
            {submitting ? 'Entering…' : 'Enter vehicle'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
