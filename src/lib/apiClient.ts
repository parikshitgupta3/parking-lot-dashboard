/**
 * Base URL for all API calls; configure with VITE_API_BASE_URL.
 *
 * Defaults to same-origin (""): in development, Vite's server proxy forwards
 * /api/* to the backend (see vite.config.ts), which avoids needing CORS.
 * Set the variable only when calling the backend directly cross-origin.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

/** Normalized error thrown for every failed API call. */
export class ApiError extends Error {
  readonly status: number | undefined
  readonly path: string

  constructor(message: string, status: number | undefined, path: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.path = path
  }
}

/**
 * Pulls a human-readable message out of an error body. The backend returns
 * RFC 7807 problem details (`detail`), with `message` kept as a fallback.
 */
function extractMessage(body: unknown, fallback: string): string {
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>
    for (const key of ['detail', 'message']) {
      const value = record[key]
      if (typeof value === 'string' && value.length > 0) return value
    }
  }
  return fallback
}

async function request<T>(
  path: string,
  init: RequestInit,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...init, signal })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiError(
      'Unable to reach the parking service. Check that the backend is running.',
      undefined,
      path,
    )
  }

  if (!response.ok) {
    const fallback = `Request failed (${response.status}${response.statusText ? ' ' + response.statusText : ''})`
    let message = fallback
    try {
      message = extractMessage(await response.json(), fallback)
    } catch {
      // Non-JSON error body — keep the fallback message.
    }
    throw new ApiError(message, response.status, path)
  }

  return (await response.json()) as T
}

/** GET a JSON resource, mapping every failure mode to ApiError. */
export function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  return request<T>(path, { headers: { Accept: 'application/json' } }, signal)
}

/** POST a JSON body, mapping every failure mode to ApiError. */
export function apiPost<T>(
  path: string,
  body: unknown,
  signal?: AbortSignal,
): Promise<T> {
  return request<T>(
    path,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
    signal,
  )
}
