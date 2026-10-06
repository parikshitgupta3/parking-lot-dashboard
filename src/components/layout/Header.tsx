import { Menu, User } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-base font-semibold text-gray-900">
          Parking Lot Management
        </h1>
      </div>

      {/* User profile placeholder */}
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-gray-900">Admin User</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
          <User className="h-5 w-5" />
        </div>
      </div>
    </header>
  )
}
