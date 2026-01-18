import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, Package, Download } from 'lucide-react'

const AdminStats = () => {
  // TODO: Récupérer depuis Supabase
  const monthlyData = [
    { month: 'Jan', revenue: 1200000, orders: 45 },
    { month: 'Fév', revenue: 1500000, orders: 52 },
    { month: 'Mar', revenue: 1800000, orders: 61 },
    { month: 'Avr', revenue: 2100000, orders: 68 },
    { month: 'Mai', revenue: 2400000, orders: 75 },
    { month: 'Juin', revenue: 2700000, orders: 82 },
    { month: 'Juil', revenue: 3000000, orders: 89 },
    { month: 'Aoû', revenue: 3300000, orders: 96 },
    { month: 'Sep', revenue: 3600000, orders: 103 },
    { month: 'Oct', revenue: 3900000, orders: 110 },
    { month: 'Nov', revenue: 4200000, orders: 117 },
    { month: 'Déc', revenue: 4500000, orders: 124 },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))
  const maxOrders = Math.max(...monthlyData.map(d => d.orders))

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3" />
                Statistiques avancées
              </h1>
              <p className="text-gray-600">
                Analysez les performances de votre boutique
              </p>
            </div>
            <button className="btn-secondary flex items-center space-x-2 mt-4 md:mt-0">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
          </div>
        </motion.div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-gray-900 flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-green-600" />
                Chiffre d'affaires mensuel
              </h2>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full bg-gray-100 rounded-t" style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}>
                    <div className="w-full h-full bg-gradient-to-t from-green-500 to-green-600 rounded-t"></div>
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">{data.month}</span>
                  <span className="text-xs text-green-600 font-bold">{formatPrice(data.revenue)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-gray-900 flex items-center">
                <ShoppingCart className="w-6 h-6 mr-2 text-blue-600" />
                Commandes mensuelles
              </h2>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full bg-gray-100 rounded-t" style={{ height: `${(data.orders / maxOrders) * 100}%` }}>
                    <div className="w-full h-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t"></div>
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">{data.month}</span>
                  <span className="text-xs text-blue-600 font-bold">{data.orders}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Métriques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">CA Total</p>
                <p className="text-2xl font-black text-gray-900">{formatPrice(34500000)}</p>
              </div>
            </div>
            <p className="text-xs text-green-600">+25% vs année dernière</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Commandes Total</p>
                <p className="text-2xl font-black text-gray-900">1,089</p>
              </div>
            </div>
            <p className="text-xs text-blue-600">+18% vs année dernière</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Clients Total</p>
                <p className="text-2xl font-black text-gray-900">1,247</p>
              </div>
            </div>
            <p className="text-xs text-purple-600">+15% vs année dernière</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Produits</p>
                <p className="text-2xl font-black text-gray-900">156</p>
              </div>
            </div>
            <p className="text-xs text-orange-600">+8 nouveaux ce mois</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminStats
