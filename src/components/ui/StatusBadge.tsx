import {
  CircleCheck,
  Clock,
  LogOut,
  SquareParking,
  TriangleAlert,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type BadgeVariant =
  | 'available'
  | 'occupied'
  | 'active'
  | 'paid'
  | 'exited'
  | 'overdue'

interface BadgeStyle {
  container: string
  icon: LucideIcon
}

// Status colors always ship with an icon + text label, never color alone.
const badgeStyles: Record<BadgeVariant, BadgeStyle> = {
  available: {
    container: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    icon: CircleCheck,
  },
  occupied: {
    container: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    icon: SquareParking,
  },
  active: {
    container: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    icon: Clock,
  },
  paid: {
    container: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    icon: CircleCheck,
  },
  exited: {
    container: 'bg-gray-100 text-gray-600 ring-gray-500/20',
    icon: LogOut,
  },
  overdue: {
    container: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    icon: TriangleAlert,
  },
}

interface StatusBadgeProps {
  variant: BadgeVariant
  label: string
}

export default function StatusBadge({ variant, label }: StatusBadgeProps) {
  const { container, icon: Icon } = badgeStyles[variant]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${container}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  )
}
