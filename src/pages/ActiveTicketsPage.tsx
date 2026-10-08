import { useCallback, useState } from 'react'
import {
  EmptyState,
  ErrorState,
  Spinner,
} from '../components/ui'
import {
  mapActiveTicket,
  toSpotForExit,
} from '../features/activeTickets/mappers'
import ActiveTicketsTable from '../features/activeTickets/ActiveTicketsTable'
import VehicleExitModal from '../features/parkingLots/VehicleExitModal'
import { useApiData } from '../hooks/useApiData'
import { fetchActiveTickets } from '../services/ticketService'
import type { ActiveTicketSummary } from '../types/parking'

export default function ActiveTicketsPage() {
  const [exitTicket, setExitTicket] = useState<ActiveTicketSummary | null>(null)

  const loadTickets = useCallback(
    (signal: AbortSignal) => fetchActiveTickets(signal),
    [],
  )
  const ticketsQuery = useApiData(loadTickets)
  const tickets = (ticketsQuery.data ?? []).map(mapActiveTicket)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Active Tickets</h2>
        <p className="mt-1 text-sm text-gray-500">
          Vehicles currently parked across all lots.
        </p>
      </div>

      {ticketsQuery.loading && ticketsQuery.data === null ? (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <Spinner label="Loading active tickets…" className="py-10" />
        </div>
      ) : ticketsQuery.error ? (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <ErrorState
            message={`Could not load active tickets. ${ticketsQuery.error.message}`}
            onRetry={ticketsQuery.reload}
            className="py-10"
          />
        </div>
      ) : tickets.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <EmptyState
            title="No active tickets"
            description="No vehicles are currently parked. Admit a vehicle from the Parking Lots page to see it here."
            className="py-10"
          />
        </div>
      ) : (
        <ActiveTicketsTable tickets={tickets} onExit={setExitTicket} />
      )}

      {exitTicket && (
        <VehicleExitModal
          spot={toSpotForExit(exitTicket)}
          floorName={exitTicket.floorName}
          onClose={() => setExitTicket(null)}
          onExitSuccess={() => ticketsQuery.reload()}
        />
      )}
    </div>
  )
}
