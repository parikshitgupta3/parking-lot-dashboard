import type { ReactNode } from 'react'

interface SectionCardProps {
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
  children: ReactNode
}

export default function SectionCard({
  title,
  subtitle,
  action,
  className = '',
  children,
}: SectionCardProps) {
  return (
    <section
      className={`rounded-xl border border-gray-200 bg-white p-5 ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
