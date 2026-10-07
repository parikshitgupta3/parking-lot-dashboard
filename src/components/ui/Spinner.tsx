import { Loader2 } from 'lucide-react'

interface SpinnerProps {
  label?: string
  className?: string
}

export default function Spinner({ label, className = '' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
      {label && <span className="text-sm text-gray-500">{label}</span>}
    </div>
  )
}
