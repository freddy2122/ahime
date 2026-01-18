import { motion } from 'framer-motion'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  // TODO: Récupérer depuis Supabase
  const stats = {
    totalRevenue: 4500000,
    totalOrders: 289,
    totalUsers: 1247,
    totalProducts: 156,
    todayRevenue: 125000,
    todayOrders: 12,
    pendingOrders: 23,
    lowStockProducts: 8,
  }

  const recentOrders = [
    {
      id: 'CMD-2024-001',
      customer: 'Jean Dupont',
      amount: 50000,
      status: 'completed',
      date: '2024-12-21 14:30',
    },
    {
      id: 'CMD-2024-002',
      customer: 'Marie Martin',
      amount: 149000,
      status: 'pending',
      date: '2024-12-21 13:15',
    },
    {
      id: 'CMD-2024-003',
      customer: 'Pierre Koffi',
      amount: 45000,
      status: 'processing',
      date: '2024-12-21 12:00',
    },
    {
      id: 'CMD-2024-004',
      customer: 'Sophie Togo',
      amount: 320000,
      status: 'completed',
      date: '2024-12-21 11:45',
    },
  ]

  const topProducts = [
    { name: 'Laptop HP Pavilion 15', sales: 45, revenue: 2250000 },
    { name: 'Smartphone Samsung', sales: 38, revenue: 570000 },
    { name: 'Réfrigérateur LG', sales: 28, revenue: 8960000 },
    { name: 'TV Samsung 55"', sales: 25, revenue: 7000000 },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
    }
    const labels = {
      completed: 'Terminée',
      pending: 'En attente',
      processing: 'En cours',
      cancelled: 'Annulée',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2">
            Tableau de bord Admin
          </h1>
          <p className="text-gray-600">
            Vue d'ensemble de votre activité e-commerce
          </p>
        </motion.div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-white/80 text-sm mb-1">Chiffre d'affaires</h3>
            <p className="text-3xl font-black">{formatPrice(stats.totalRevenue)}</p>
            <p className="text-xs text-white/75 mt-2">
              Aujourd'hui: {formatPrice(stats.todayRevenue)} (+12%)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart className="w-8 h-8" />
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <h3 className="text-white/80 text-sm mb-1">Commandes</h3>
            <p className="text-3xl font-black">{stats.totalOrders}</p>
            <p className="text-xs text-white/75 mt-2">
              Aujourd'hui: {stats.todayOrders} (+8%)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-white/80 text-sm mb-1">Utilisateurs</h3>
            <p className="text-3xl font-black">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-white/75 mt-2">
              Nouveaux ce mois: +145 (+13%)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8" />
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="text-white/80 text-sm mb-1">Produits</h3>
            <p className="text-3xl font-black">{stats.totalProducts}</p>
            <p className="text-xs text-white/75 mt-2">
              Faible stock: {stats.lowStockProducts}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Commandes récentes */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-gray-900">Commandes récentes</h2>
                <Link
                  to="/admin/orders"
                  className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center space-x-1"
                >
                  <span>Voir tout</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono font-semibold text-gray-900">{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{formatPrice(order.amount)}</p>
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="text-xs text-primary-600 hover:text-primary-700 flex items-center space-x-1 mt-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Détails</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Meilleurs produits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-gray-900">Meilleurs produits</h2>
                <Link
                  to="/admin/products"
                  className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center space-x-1"
                >
                  <span>Voir tout</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.sales} ventes</p>
                      </div>
                    </div>
                    <p className="font-bold text-primary-600">{formatPrice(product.revenue)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Actions rapides */}
          <div className="space-y-6">
            {/* Alertes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Alertes</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{stats.pendingOrders} commandes en attente</p>
                    <Link to="/admin/orders?status=pending" className="text-xs text-yellow-700 hover:text-yellow-800">
                      Voir les commandes
                    </Link>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <Package className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{stats.lowStockProducts} produits en faible stock</p>
                    <Link to="/admin/products?stock=low" className="text-xs text-red-700 hover:text-red-800">
                      Voir les produits
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions rapides */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Actions rapides</h2>
              <div className="space-y-2">
                <Link
                  to="/admin/products/new"
                  className="block w-full btn-primary text-center py-3"
                >
                  Ajouter un produit
                </Link>
                <Link
                  to="/admin/promotions/new"
                  className="block w-full btn-secondary text-center py-3"
                >
                  Créer une promotion
                </Link>
                <Link
                  to="/admin/reports"
                  className="block w-full btn-secondary text-center py-3"
                >
                  Générer un rapport
                </Link>
              </div>
            </motion.div>

            {/* Statistiques rapides */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-lg p-6 text-white"
            >
              <h2 className="font-heading text-xl font-bold mb-4">Résumé du mois</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-white/80 text-sm mb-1">CA du mois</p>
                  <p className="text-2xl font-black">{formatPrice(stats.totalRevenue)}</p>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-white/80 text-sm mb-1">Commandes</p>
                  <p className="text-xl font-bold">{stats.totalOrders}</p>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-white/80 text-sm mb-1">Panier moyen</p>
                  <p className="text-xl font-bold">
                    {formatPrice(stats.totalRevenue / stats.totalOrders)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
