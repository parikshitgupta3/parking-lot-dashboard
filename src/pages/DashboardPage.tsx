import { Car, CircleCheck, SquareParking, Ticket } from 'lucide-react'
import { StatCard } from '../components/ui'
import FloorOverview from '../features/dashboard/FloorOverview'
import OccupancyIndicator from '../features/dashboard/OccupancyIndicator'
import RecentActivityTable from '../features/dashboard/RecentActivityTable'
import {
  mockFloors,
  mockRecentActivity,
  mockSummary,
} from '../features/dashboard/mockData'

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500">
          Snapshot of parking operations across all floors.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total spots"
          value={mockSummary.totalSpots}
          icon={SquareParking}
        />
        <StatCard
          label="Available"
          value={mockSummary.availableSpots}
          icon={CircleCheck}
        />
        <StatCard
          label="Occupied"
          value={mockSummary.occupiedSpots}
          icon={Car}
        />
        <StatCard
          label="Active tickets"
          value={mockSummary.activeTickets}
          icon={Ticket}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <OccupancyIndicator
          occupied={mockSummary.occupiedSpots}
          total={mockSummary.totalSpots}
        />
        <div className="lg:col-span-2">
          <FloorOverview floors={mockFloors} />
        </div>
      </div>

      <div className="mt-4">
        <RecentActivityTable activities={mockRecentActivity} />
      </div>
    </div>
  )
}
