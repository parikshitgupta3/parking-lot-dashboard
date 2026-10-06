import { Car } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Car className="mx-auto mb-4 h-12 w-12 text-gray-700" />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Parking Lot Management
        </h1>
      </div>
    </main>
  )
}
