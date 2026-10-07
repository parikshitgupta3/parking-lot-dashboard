import type { ParkingSpotStatus } from '../../types/parking'

/**
 * Diagonal hatch used for out-of-service spots. Kept as a literal string so
 * Tailwind's scanner registers the arbitrary-property candidate once.
 */
export const outOfServiceHatch =
  '[background-image:repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(107,114,128,0.15)_4px,rgba(107,114,128,0.15)_8px)]'

export const parkingSpotStatusLabels: Record<ParkingSpotStatus, string> = {
  available: 'Available',
  occupied: 'Occupied',
  out_of_service: 'Out of service',
}

/** Full tile treatment per status (used by the grid tiles). */
export const parkingSpotTileClasses: Record<ParkingSpotStatus, string> = {
  available:
    'border-dashed border-gray-300 bg-white text-gray-500 hover:border-indigo-400 hover:text-indigo-600',
  occupied: 'border-indigo-600 bg-indigo-600 text-white',
  out_of_service: `border-gray-300 bg-gray-100 text-gray-400 ${outOfServiceHatch}`,
}

/** Small swatch treatment per status (used by the legend). */
export const parkingSpotSwatchClasses: Record<ParkingSpotStatus, string> = {
  available: 'border border-gray-300 bg-white',
  occupied: 'border border-indigo-600 bg-indigo-600',
  out_of_service: `border border-gray-300 bg-gray-100 ${outOfServiceHatch}`,
}
