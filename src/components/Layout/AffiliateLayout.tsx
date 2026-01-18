import { ReactNode } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Link2,
  DollarSign,
  Share2,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  BarChart3,
  FileText,
  Gift,
  Home,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const AffiliateLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // TODO: Récupérer depuis Supabase/Auth
  const affiliateCode = 'AHIME123'
  const affiliateName = 'John Doe'

  const handleLogout = () => {
    // TODO: Déconnexion via Supabase
    toast.success('Déconnexion réussie')
    navigate('/')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/affiliate/dashboard', exact: true },
    { icon: Link2, label: 'Mes liens', path: '/affiliate/links' },
    { icon: TrendingUp, label: 'Statistiques', path: '/affiliate/stats' },
    { icon: DollarSign, label: 'Commissions', path: '/affiliate/commissions' },
    { icon: FileText, label: 'Rapports', path: '/affiliate/reports' },
    { icon: Share2, label: 'Partager', path: '/affiliate/share' },
    { icon: Settings, label: 'Paramètres', path: '/affiliate/settings' },
  ]

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed left-0 top-0 h-screen z-30">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <span className="font-script text-2xl text-primary-600 font-bold lowercase tracking-wide group-hover:text-primary-700 transition-colors duration-300">
                ahimè
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-500 rounded-full border border-white"></div>
            </div>
          </Link>
          <p className="text-xs text-gray-500 mt-2 ml-2">Espace Parrain</p>
        </div>

        {/* Code d'affiliation */}
        <div className="p-4 mx-4 mt-4 bg-accent-50 border-2 border-accent-200 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Votre code</p>
          <p className="text-lg font-bold text-accent-700">{affiliateCode}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path, item.exact)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-primary-50 text-primary-600 font-semibold border-l-4 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User info & Logout */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="flex items-center space-x-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{affiliateName}</p>
              <p className="text-xs text-gray-500">Parrain</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-script text-xl text-primary-600 font-bold lowercase">
              ahimè
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-64 bg-white h-full shadow-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <span className="font-script text-2xl text-primary-600 font-bold lowercase">
                  ahimè
                </span>
              </Link>
              <div className="bg-accent-50 border-2 border-accent-200 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Votre code</p>
                <p className="text-lg font-bold text-accent-700">{affiliateCode}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path, item.exact)
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-primary-50 text-primary-600 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex items-center space-x-3 px-4 py-2">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{affiliateName}</p>
                  <p className="text-xs text-gray-500">Parrain</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AffiliateLayout
