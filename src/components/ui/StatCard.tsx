import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  /** Tailwind classes for the icon chip. Defaults to the app accent. */
  iconClassName?: string
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  iconClassName = 'bg-indigo-50 text-indigo-600',
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">{label}</p>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  )
}
