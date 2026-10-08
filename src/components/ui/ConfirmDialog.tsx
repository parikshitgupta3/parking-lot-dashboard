import { Loader2, TriangleAlert } from 'lucide-react'
import Modal from './Modal'

interface ConfirmDialogDetail {
  label: string
  value: string
}

interface ConfirmDialogProps {
  title: string
  message?: string
  /** Read-only rows shown above the actions (e.g. the entity being confirmed). */
  details?: ConfirmDialogDetail[]
  confirmLabel: string
  cancelLabel?: string
  /** Disables actions and shows a spinner on the confirm button. */
  busy?: boolean
  /** Error message from the confirmed action, if it failed. */
  error?: string | null
  /** Styles the confirm button as destructive (red). */
  destructive?: boolean
  onConfirm: () => void
  onClose: () => void
}

/** Generic confirmation modal: message + optional detail rows + actions. */
export default function ConfirmDialog({
  title,
  message,
  details,
  confirmLabel,
  cancelLabel = 'Cancel',
  busy = false,
  error = null,
  destructive = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal title={title} onClose={onClose} dismissible={!busy}>
      <div className="p-5">
        {message && <p className="text-sm text-gray-600">{message}</p>}

        {details && details.length > 0 && (
          <div className="mt-3 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-gray-50 px-4 py-1.5">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex items-center justify-between gap-3 py-2"
              >
                <span className="shrink-0 text-sm text-gray-500">
                  {detail.label}
                </span>
                <span className="text-right text-sm font-medium text-gray-900">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white disabled:opacity-60 ${
              destructive
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
