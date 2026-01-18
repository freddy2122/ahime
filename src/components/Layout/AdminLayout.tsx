import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  DollarSign,
  Tag,
  FileText,
  Shield,
  Bell,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { notificationService } from '../../services/notificationService'
import { Link } from 'react-router-dom'

const AdminLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState<any[]>([])

  // TODO: Récupérer depuis Supabase/Auth
  const adminName = 'Admin'

  // Charger les notifications
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const count = await notificationService.getUnreadCount()
        setUnreadCount(count)
        
        const notifs = await notificationService.getMyNotifications(5)
        setNotifications(notifs)
      } catch (error) {
        // Ignorer les erreurs si l'utilisateur n'est pas connecté
      }
    }

    loadNotifications()
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    // TODO: Déconnexion via Supabase
    toast.success('Déconnexion réussie')
    navigate('/')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin', exact: true },
    { icon: Package, label: 'Produits', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Commandes', path: '/admin/orders' },
    { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
    { icon: DollarSign, label: 'Affiliés', path: '/admin/affiliates' },
    { icon: Tag, label: 'Promotions', path: '/admin/promotions' },
    { icon: BarChart3, label: 'Statistiques', path: '/admin/stats' },
    { icon: FileText, label: 'Rapports', path: '/admin/reports' },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings' },
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
      <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-primary-600 to-primary-700 text-white fixed left-0 top-0 h-screen z-30">
        <div className="p-6 border-b border-primary-500">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <span className="font-script text-2xl text-white font-bold lowercase tracking-wide group-hover:text-gray-100 transition-colors duration-300">
                ahimè
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full border-2 border-white shadow-md"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </Link>
          <div className="flex items-center space-x-2 mt-2 ml-2">
            <Shield className="w-4 h-4" />
            <p className="text-xs text-primary-100">Administration</p>
          </div>
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
                    ? 'bg-white/20 text-white font-semibold border-l-4 border-white'
                    : 'text-primary-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User info & Logout */}
        <div className="p-4 border-t border-primary-500 space-y-3">
          <div className="flex items-center space-x-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{adminName}</p>
              <p className="text-xs text-primary-100">Administrateur</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-primary-600 text-white border-b border-primary-500 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span className="font-script text-xl text-white font-bold lowercase">
              ahimè Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center"
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
            className="w-64 bg-gradient-to-b from-primary-600 to-primary-700 text-white h-full shadow-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5" />
                <span className="font-script text-2xl text-white font-bold lowercase">
                  ahimè Admin
                </span>
              </Link>
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
                        ? 'bg-white/20 text-white font-semibold'
                        : 'text-primary-100 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-primary-500 space-y-3">
              <div className="flex items-center space-x-3 px-4 py-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{adminName}</p>
                  <p className="text-xs text-primary-100">Administrateur</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/10"
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
        {/* Header avec notifications */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          </div>
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown Notifications */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    Aucune notification
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {notifications.map((notif) => (
                      <Link
                        key={notif.id}
                        to={notif.data?.order_id ? `/admin/orders` : '/admin'}
                        onClick={() => {
                          if (!notif.read) {
                            notificationService.markAsRead(notif.id)
                            setUnreadCount(Math.max(0, unreadCount - 1))
                          }
                          setNotificationsOpen(false)
                        }}
                        className="block p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notif.read ? 'bg-transparent' : 'bg-primary-500'}`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-gray-900">{notif.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(notif.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {notifications.length > 0 && (
                  <div className="p-4 border-t border-gray-200">
                    <Link
                      to="/admin/orders"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      Voir toutes les notifications
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
