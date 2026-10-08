import { apiPost } from '../lib/apiClient'
import type { TicketDto } from '../types/parkingLotApi'

const BASE_PATH = '/api/v1/tickets'

/** POST /api/v1/tickets/{id}/exit — check out the vehicle and settle the fee. */
export function checkoutTicket(ticketId: string): Promise<TicketDto> {
  return apiPost<TicketDto>(
    `${BASE_PATH}/${encodeURIComponent(ticketId)}/exit`,
    {},
  )
}
