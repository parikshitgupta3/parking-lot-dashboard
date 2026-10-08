const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
})

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
})

/** Formats an ISO timestamp as "7 Oct, 09:15 AM". */
export function formatDateTime(iso: string): string {
  const date = new Date(iso)
  return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`
}

/** Formats the elapsed time since an ISO timestamp as "2h 15m" / "40m". */
export function formatDuration(iso: string, now: number = Date.now()): string {
  const minutes = Math.max(
    0,
    Math.round((now - new Date(iso).getTime()) / 60_000),
  )
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return hours === 0 ? `${remainder}m` : `${hours}h ${remainder}m`
}
