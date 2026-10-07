import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '../lib/apiClient'

interface ApiDataState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

export interface ApiDataResult<T> extends ApiDataState<T> {
  /** Re-runs the fetcher, keeping the previous data visible while loading. */
  reload: () => void
}

/**
 * Runs an abortable fetcher and exposes its loading / error / data state.
 * The fetcher must be memoized (useCallback) — it is the effect's dependency.
 */
export function useApiData<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
): ApiDataResult<T> {
  const [state, setState] = useState<ApiDataState<T>>({
    data: null,
    loading: true,
    error: null,
  })
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetcher(controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState((prev) => ({
          data: prev.data,
          loading: false,
          error:
            error instanceof ApiError
              ? error
              : new ApiError('Something went wrong while fetching data.', undefined, ''),
        }))
      })

    return () => controller.abort()
  }, [fetcher, refreshKey])

  // Flip to loading here (an event handler, not the effect) so a refetch
  // keeps the previous data visible without a skeleton flash.
  const reload = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    setRefreshKey((key) => key + 1)
  }, [])

  return { ...state, reload }
}
