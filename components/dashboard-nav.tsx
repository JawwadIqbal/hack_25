import Link from "next/link"
import { Home, MessageSquare, Calendar, Map, DollarSign, Settings, HelpCircle } from "lucide-react"

export function DashboardNav() {
  return (
    <div className="hidden border-r bg-gray-50/40 lg:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 transition-all"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard?tab=assistant"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-100 transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </Link>
            <Link
              href="/dashboard?tab=itinerary"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 transition-all"
            >
              <Calendar className="h-4 w-4" />
              Itinerary Planner
            </Link>
            <Link
              href="/dashboard?tab=options"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 transition-all"
            >
              <Map className="h-4 w-4" />
              Travel Options
            </Link>
            <Link
              href="/dashboard?tab=cost"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 transition-all"
            >
              <DollarSign className="h-4 w-4" />
              Cost Estimator
            </Link>

            <div className="mt-6 border-t pt-6">
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 transition-all"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                href="/help"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 transition-all"
              >
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

