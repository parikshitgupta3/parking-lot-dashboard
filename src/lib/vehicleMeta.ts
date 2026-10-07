import { Bike, Car, PlugZap, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SpotType, VehicleType } from '../types/parking'

/** Shared display metadata for vehicle types. */
export const vehicleTypeMeta: Record<
  VehicleType,
  { label: string; icon: LucideIcon }
> = {
  car: { label: 'Car', icon: Car },
  motorcycle: { label: 'Motorcycle', icon: Bike },
  truck: { label: 'Truck', icon: Truck },
}

/** Shared display metadata for parking spot types. */
export const spotTypeMeta: Record<
  SpotType,
  { label: string; icon: LucideIcon }
> = {
  car: { label: 'Car', icon: Car },
  motorcycle: { label: 'Motorcycle', icon: Bike },
  truck: { label: 'Truck', icon: Truck },
  ev: { label: 'EV charging', icon: PlugZap },
}
