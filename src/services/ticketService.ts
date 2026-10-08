import { apiGet, apiPost } from '../lib/apiClient'
import type {
  ActiveTicketSummaryDto,
  TicketDto,
} from '../types/parkingLotApi'

const BASE_PATH = '/api/v1/tickets'

/** GET /api/v1/tickets/active — every active ticket across lots, oldest first. */
export function fetchActiveTickets(
  signal?: AbortSignal,
): Promise<ActiveTicketSummaryDto[]> {
  return apiGet<ActiveTicketSummaryDto[]>(`${BASE_PATH}/active`, signal)
}

/** POST /api/v1/tickets/{id}/exit — check out the vehicle and settle the fee. */
export function checkoutTicket(ticketId: string): Promise<TicketDto> {
  return apiPost<TicketDto>(
    `${BASE_PATH}/${encodeURIComponent(ticketId)}/exit`,
    {},
  )
}
