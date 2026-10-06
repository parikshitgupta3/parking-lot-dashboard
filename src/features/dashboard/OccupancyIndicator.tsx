import { CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionCard } from '../../components/ui'

interface OccupancyIndicatorProps {
  occupied: number
  total: number
}

interface Severity {
  bar: string
  track: string
  text: string
  label: string
  icon: LucideIcon
}

function severityFor(percentage: number): Severity {
  if (percentage >= 90) {
    return {
      bar: 'bg-red-500',
      track: 'bg-red-100',
      text: 'text-red-700',
      label: 'Nearly full',
      icon: TriangleAlert,
    }
  }
  if (percentage >= 70) {
    return {
      bar: 'bg-amber-500',
      track: 'bg-amber-100',
      text: 'text-amber-700',
      label: 'High demand',
      icon: CircleAlert,
    }
  }
  return {
    bar: 'bg-indigo-500',
    track: 'bg-indigo-100',
    text: 'text-indigo-700',
    label: 'Space available',
    icon: CircleCheck,
  }
}

export default function OccupancyIndicator({
  occupied,
  total,
}: OccupancyIndicatorProps) {
  const percentage = Math.round((occupied / total) * 100)
  const severity = severityFor(percentage)
  const SeverityIcon = severity.icon

  return (
    <SectionCard title="Occupancy" subtitle="Across all floors">
      <p className="text-3xl font-semibold text-gray-900">{percentage}%</p>
      <p
        className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${severity.text}`}
      >
        <SeverityIcon className="h-3.5 w-3.5" />
        {severity.label}
      </p>
      <div
        className={`mt-2 h-2.5 w-full rounded-full ${severity.track}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percentage}% occupied`}
      >
        {/* Fill carries severity; the track is a lighter step of the same ramp. */}
        <div
          className={`h-2.5 rounded-full ${severity.bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-gray-500">
        {occupied} of {total} spots occupied
      </p>
    </SectionCard>
  )
}
