import { LogOut } from 'lucide-react'
import { SectionCard } from '../../components/ui'
import { formatDateTime, formatDuration } from '../../lib/format'
import { spotTypeMeta, vehicleTypeMeta } from '../../lib/vehicleMeta'
import type { ActiveTicketSummary } from '../../types/parking'

interface ActiveTicketsTableProps {
  tickets: ActiveTicketSummary[]
  onExit: (ticket: ActiveTicketSummary) => void
}

export default function ActiveTicketsTable({
  tickets,
  onExit,
}: ActiveTicketsTableProps) {
  return (
    <SectionCard
      title="Active tickets"
      subtitle={`${tickets.length} vehicle${tickets.length === 1 ? '' : 's'} currently parked`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 pr-6 font-medium">Ticket</th>
              <th className="pb-3 pr-6 font-medium">Vehicle</th>
              <th className="pb-3 pr-6 font-medium">Type</th>
              <th className="pb-3 pr-6 font-medium">Spot</th>
              <th className="pb-3 pr-6 font-medium">Floor</th>
              <th className="pb-3 pr-6 font-medium">Lot</th>
              <th className="pb-3 pr-6 font-medium">Entry</th>
              {/* aria-label, not sr-only: an absolutely-positioned sr-only
                  span escapes the scroll wrapper and causes page overflow. */}
              <th className="pb-3 font-medium" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const VehicleIcon = vehicleTypeMeta[ticket.vehicleType].icon
              const SpotIcon = spotTypeMeta[ticket.spotType].icon

              return (
                <tr
                  key={ticket.ticketId}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td
                    className="py-3 pr-6 font-mono text-xs whitespace-nowrap text-gray-500"
                    title={ticket.ticketId}
                  >
                    <span className="block max-w-24 truncate">
                      {ticket.ticketId}
                    </span>
                  </td>
                  <td className="py-3 pr-6 font-medium whitespace-nowrap text-gray-900">
                    {ticket.licensePlate}
                  </td>
                  <td className="py-3 pr-6 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <VehicleIcon className="h-4 w-4 shrink-0" />
                      {vehicleTypeMeta[ticket.vehicleType].label}
                    </span>
                  </td>
                  <td className="py-3 pr-6 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-gray-900">
                      <SpotIcon className="h-4 w-4 shrink-0 text-gray-400" />
                      <span className="font-mono">{ticket.spotCode}</span>
                      <span className="text-xs text-gray-400">
                        {spotTypeMeta[ticket.spotType].label}
                      </span>
                    </span>
                  </td>
                  <td className="py-3 pr-6 whitespace-nowrap text-gray-500">
                    {ticket.floorName}
                  </td>
                  <td className="py-3 pr-6 whitespace-nowrap text-gray-500">
                    {ticket.lotName}
                  </td>
                  <td className="py-3 pr-6 whitespace-nowrap">
                    <p className="text-gray-900">
                      {formatDateTime(ticket.entryTime)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDuration(ticket.entryTime)} parked
                    </p>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onExit(ticket)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Exit
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )
}
