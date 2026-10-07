import { Bike, Car, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SpotType, VehicleType } from '../types/parking'

/** Shared display metadata for vehicle types. */
export const vehicleTypeMeta: Record<
  VehicleType,
  { label: string; icon: LucideIcon }
> = {
  bike: { label: 'Bike', icon: Bike },
  car: { label: 'Car', icon: Car },
  truck: { label: 'Truck', icon: Truck },
}

/** Shared display metadata for parking spot types. */
export const spotTypeMeta: Record<
  SpotType,
  { label: string; icon: LucideIcon }
> = {
  bike: { label: 'Bike', icon: Bike },
  compact: { label: 'Compact', icon: Car },
  large: { label: 'Large', icon: Truck },
}
