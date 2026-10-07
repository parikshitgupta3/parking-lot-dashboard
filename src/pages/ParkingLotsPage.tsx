import { useState } from 'react'
import { SectionCard } from '../components/ui'
import ParkingFloor from '../features/parkingLots/ParkingFloor'
import SpotDetailsPanel from '../features/parkingLots/SpotDetailsPanel'
import SpotLegend from '../features/parkingLots/SpotLegend'
import { mockParkingLots } from '../features/parkingLots/mockData'
import type { ParkingSpot as ParkingSpotData } from '../types/parking'

export default function ParkingLotsPage() {
  const [selectedLotId, setSelectedLotId] = useState(mockParkingLots[0].id)
  const [selectedFloorId, setSelectedFloorId] = useState(
    mockParkingLots[0].floors[0].id,
  )
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpotData | null>(null)

  const selectedLot =
    mockParkingLots.find((lot) => lot.id === selectedLotId) ?? mockParkingLots[0]
  const selectedFloor =
    selectedLot.floors.find((floor) => floor.id === selectedFloorId) ??
    selectedLot.floors[0]

  function handleLotChange(lotId: string) {
    const lot = mockParkingLots.find((l) => l.id === lotId) ?? mockParkingLots[0]
    setSelectedLotId(lot.id)
    setSelectedFloorId(lot.floors[0].id)
    setSelectedSpot(null)
  }

  function handleFloorChange(floorId: string) {
    setSelectedFloorId(floorId)
    setSelectedSpot(null)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Parking Lots</h2>
        <p className="mt-1 text-sm text-gray-500">
          Browse lots and floors to see live spot availability.
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <label
            htmlFor="parking-lot"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Parking lot
          </label>
          <select
            id="parking-lot"
            value={selectedLotId}
            onChange={(event) => handleLotChange(event.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:w-72"
          >
            {mockParkingLots.map((lot) => (
              <option key={lot.id} value={lot.id}>
                {lot.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">{selectedLot.address}</p>
        </div>

        <div
          role="tablist"
          aria-label="Floors"
          className="flex gap-1 overflow-x-auto rounded-lg border border-gray-200 bg-white p-1"
        >
          {selectedLot.floors.map((floor) => {
            const available = floor.spots.filter(
              (spot) => spot.status === 'available',
            ).length
            const active = floor.id === selectedFloor.id

            return (
              <button
                key={floor.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleFloorChange(floor.id)}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {floor.name}
                <span
                  className={`ml-1.5 text-xs ${active ? 'text-indigo-200' : 'text-gray-400'}`}
                >
                  {available} available
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <SectionCard
          title={selectedFloor.name}
          subtitle={selectedLot.name}
          action={<SpotLegend />}
          className="xl:col-span-3"
        >
          <ParkingFloor
            floor={selectedFloor}
            selectedSpotId={selectedSpot?.id}
            onSelectSpot={setSelectedSpot}
          />
        </SectionCard>

        <SpotDetailsPanel
          spot={selectedSpot}
          floorName={selectedFloor.name}
          className="h-fit xl:sticky xl:top-20"
        />
      </div>
    </div>
  )
}
