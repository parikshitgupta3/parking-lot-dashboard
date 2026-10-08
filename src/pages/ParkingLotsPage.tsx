import { useCallback, useState } from 'react'
import {
  Ban,
  Car,
  CircleCheck,
  Layers,
  SquareParking,
  Warehouse,
} from 'lucide-react'
import {
  EmptyState,
  ErrorState,
  SectionCard,
  Spinner,
  StatCard,
} from '../components/ui'
import ParkingFloor from '../features/parkingLots/ParkingFloor'
import SpotDetailsPanel from '../features/parkingLots/SpotDetailsPanel'
import SpotLegend from '../features/parkingLots/SpotLegend'
import VehicleEntryModal from '../features/parkingLots/VehicleEntryModal'
import {
  mapParkingLotDetails,
  mapParkingLotSummary,
} from '../features/parkingLots/mappers'
import { useApiData } from '../hooks/useApiData'
import {
  fetchParkingLot,
  fetchParkingLotAvailability,
  fetchParkingLots,
} from '../services/parkingLotService'
import type { ParkingSpot as ParkingSpotData } from '../types/parking'
import type { TicketDto } from '../types/parkingLotApi'

export default function ParkingLotsPage() {
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null)

  const loadLots = useCallback((signal: AbortSignal) => fetchParkingLots(signal), [])
  const lotsQuery = useApiData(loadLots)
  const lots = (lotsQuery.data ?? []).map(mapParkingLotSummary)

  // Fall back to the first lot until the user picks one; also repairs the
  // selection if the chosen lot disappears after a refetch.
  const activeLotId =
    selectedLotId && lots.some((lot) => lot.id === selectedLotId)
      ? selectedLotId
      : (lots[0]?.id ?? null)
  const activeLot = lots.find((lot) => lot.id === activeLotId)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Parking Lots</h2>
        <p className="mt-1 text-sm text-gray-500">
          Browse lots and floors to see live spot availability.
        </p>
      </div>

      {lotsQuery.loading && lotsQuery.data === null ? (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <Spinner label="Loading parking lots…" className="py-10" />
        </div>
      ) : lotsQuery.error ? (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <ErrorState
            message={`Could not load parking lots. ${lotsQuery.error.message}`}
            onRetry={lotsQuery.reload}
            className="py-10"
          />
        </div>
      ) : lots.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <EmptyState
            icon={Warehouse}
            title="No parking lots found"
            description="No parking lots have been set up yet. Once the backend has data, it will appear here."
            className="py-10"
          />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label
              htmlFor="parking-lot"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Parking lot
            </label>
            <select
              id="parking-lot"
              value={activeLotId ?? ''}
              onChange={(event) => {
                setSelectedLotId(event.target.value)
              }}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:w-72"
            >
              {lots.map((lot) => (
                <option key={lot.id} value={lot.id}>
                  {lot.name}
                </option>
              ))}
            </select>
            {activeLot && (
              <p className="mt-1 text-xs text-gray-500">
                {activeLot.floorCount} floors · {activeLot.totalSpots} spots
              </p>
            )}
          </div>

          {activeLotId && (
            <LotSection key={activeLotId} lotId={activeLotId} lotName={activeLot?.name} />
          )}
        </>
      )}
    </div>
  )
}

interface LotSectionProps {
  lotId: string
  lotName?: string
}

/** Everything below the lot selector: availability strip, floor tabs, grid. */
function LotSection({ lotId, lotName }: LotSectionProps) {
  const [selectedFloorId, setSelectedFloorId] = useState<string | null>(null)
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpotData | null>(null)
  const [entryModalOpen, setEntryModalOpen] = useState(false)

  const loadDetails = useCallback(
    (signal: AbortSignal) => fetchParkingLot(lotId, signal),
    [lotId],
  )
  const loadAvailability = useCallback(
    (signal: AbortSignal) => fetchParkingLotAvailability(lotId, signal),
    [lotId],
  )
  const detailsQuery = useApiData(loadDetails)
  const availabilityQuery = useApiData(loadAvailability)

  const lot = detailsQuery.data ? mapParkingLotDetails(detailsQuery.data) : null
  const floors = lot?.floors ?? []
  const selectedFloor =
    floors.find((floor) => floor.id === selectedFloorId) ?? floors[0]
  const allSpots = floors.flatMap((floor) => floor.spots)
  const availability = availabilityQuery.data

  function handleFloorChange(floorId: string) {
    setSelectedFloorId(floorId)
    setSelectedSpot(null)
  }

  /** Refresh counts/grid and jump to the freshly allocated spot. */
  function handleEntrySuccess(newTicket: TicketDto) {
    detailsQuery.reload()
    availabilityQuery.reload()

    const floor = floors.find((f) =>
      f.spots.some((spot) => spot.code === newTicket.spotNumber),
    )
    if (!floor) return
    setSelectedFloorId(floor.id)
    const allocated = floor.spots.find(
      (spot) => spot.code === newTicket.spotNumber,
    )
    if (allocated) {
      // Optimistically show occupied; the reloaded details confirm it.
      setSelectedSpot({ ...allocated, status: 'occupied' })
    }
  }

  return (
    <>
      {availabilityQuery.error ? (
        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-5">
          <ErrorState
            message={`Could not load availability. ${availabilityQuery.error.message}`}
            onRetry={availabilityQuery.reload}
            className="py-6"
          />
        </div>
      ) : (
        <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <StatCard
            label="Total spots"
            value={allSpots.length || '—'}
            icon={SquareParking}
          />
          <StatCard
            label="Available"
            value={availability?.availableSpotCount ?? '—'}
            icon={CircleCheck}
          />
          <StatCard
            label="Occupied"
            value={
              lot
                ? allSpots.filter((spot) => spot.status === 'occupied').length
                : '—'
            }
            icon={Car}
          />
          <StatCard
            label="Out of service"
            value={
              lot
                ? allSpots.filter((spot) => spot.status === 'out_of_service')
                    .length
                : '—'
            }
            icon={Ban}
          />
        </div>
      )}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {floors.length > 0 && (
        <div
          role="tablist"
          aria-label="Floors"
          className="flex gap-1 overflow-x-auto rounded-lg border border-gray-200 bg-white p-1"
        >
          {floors.map((floor) => {
            const available = floor.spots.filter(
              (spot) => spot.status === 'available',
            ).length
            const active = floor.id === selectedFloor?.id

            return (
              <button
                key={floor.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleFloorChange(floor.id)}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {floor.name}
                <span
                  className={`ml-1.5 text-xs ${active ? 'text-indigo-200' : 'text-gray-400'}`}
                >
                  {available} available
                </span>
              </button>
            )
          })}
          </div>
        )}

        <button
          type="button"
          onClick={() => setEntryModalOpen(true)}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Car className="h-4 w-4" />
          Enter vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <SectionCard
          title={selectedFloor?.name ?? 'Floor'}
          subtitle={lotName}
          action={<SpotLegend />}
          className="xl:col-span-3"
        >
          {detailsQuery.loading && lot === null ? (
            <Spinner label="Loading spots…" className="py-10" />
          ) : detailsQuery.error ? (
            <ErrorState
              message={`Could not load floors. ${detailsQuery.error.message}`}
              onRetry={detailsQuery.reload}
              className="py-10"
            />
          ) : lot !== null && lot.floors.length === 0 ? (
            <EmptyState
              icon={Layers}
              title="No floors yet"
              description="This parking lot has no floors configured."
              className="py-10"
            />
          ) : selectedFloor && selectedFloor.spots.length > 0 ? (
            <ParkingFloor
              floor={selectedFloor}
              selectedSpotId={selectedSpot?.id}
              onSelectSpot={setSelectedSpot}
            />
          ) : (
            <EmptyState
              title="No spots on this floor"
              description="This floor has no parking spots configured."
              className="py-10"
            />
          )}
        </SectionCard>

        <SpotDetailsPanel
          spot={selectedSpot}
          floorName={selectedFloor?.name}
          className="h-fit xl:sticky xl:top-20"
        />
      </div>

      {entryModalOpen && (
        <VehicleEntryModal
          lotId={lotId}
          lotName={lotName}
          onClose={() => setEntryModalOpen(false)}
          onEntrySuccess={handleEntrySuccess}
        />
      )}
    </>
  )
}
