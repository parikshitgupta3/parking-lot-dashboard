import { RotateCw, TriangleAlert } from 'lucide-react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
  className?: string
}

export default function ErrorState({
  message,
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
        <TriangleAlert className="h-5 w-5" />
      </span>
      <p className="mt-3 max-w-sm text-sm text-gray-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <RotateCw className="h-4 w-4" />
          Retry
        </button>
      )}
    </div>
  )
}
