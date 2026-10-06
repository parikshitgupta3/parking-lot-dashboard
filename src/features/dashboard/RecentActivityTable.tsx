import { Link } from 'react-router-dom'
import { Bike, Car, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionCard, StatusBadge } from '../../components/ui'
import { formatDateTime } from '../../lib/format'
import type { ParkingActivity, VehicleType } from '../../types/parking'

const vehicleTypeMeta: Record<VehicleType, { label: string; icon: LucideIcon }> =
  {
    car: { label: 'Car', icon: Car },
    motorcycle: { label: 'Motorcycle', icon: Bike },
    truck: { label: 'Truck', icon: Truck },
  }

const statusLabels: Record<ParkingActivity['status'], string> = {
  active: 'Active',
  paid: 'Paid',
  exited: 'Exited',
  overdue: 'Overdue',
}

interface RecentActivityTableProps {
  activities: ParkingActivity[]
}

export default function RecentActivityTable({
  activities,
}: RecentActivityTableProps) {
  return (
    <SectionCard
      title="Recent Parking Activity"
      subtitle="Latest tickets across all floors"
      action={
        <Link
          to="/active-tickets"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View all
        </Link>
      }
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 pr-6 font-medium">Vehicle</th>
              <th className="pb-3 pr-6 font-medium">Type</th>
              <th className="pb-3 pr-6 font-medium">Location</th>
              <th className="pb-3 pr-6 font-medium">Entry</th>
              <th className="pb-3 pr-6 font-medium">Exit</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => {
              const { label: typeLabel, icon: TypeIcon } =
                vehicleTypeMeta[activity.vehicleType]

              return (
                <tr
                  key={activity.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="py-3 pr-6 font-medium whitespace-nowrap text-gray-900">
                    {activity.vehicleNumber}
                  </td>
                  <td className="py-3 pr-6 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <TypeIcon className="h-4 w-4 shrink-0" />
                      {typeLabel}
                    </span>
                  </td>
                  <td className="py-3 pr-6 whitespace-nowrap text-gray-500">
                    {activity.floorName} · {activity.spotCode}
                  </td>
                  <td className="py-3 pr-6 whitespace-nowrap text-gray-500">
                    {formatDateTime(activity.entryTime)}
                  </td>
                  <td className="py-3 pr-6 whitespace-nowrap text-gray-500">
                    {activity.exitTime ? (
                      formatDateTime(activity.exitTime)
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-3">
                    <StatusBadge
                      variant={activity.status}
                      label={statusLabels[activity.status]}
                    />
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
