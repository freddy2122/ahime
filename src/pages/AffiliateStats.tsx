import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download, MousePointerClick, ShoppingCart, DollarSign, Users } from 'lucide-react'

const AffiliateStats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('month')

  // TODO: Récupérer depuis Supabase
  const stats = {
    totalClicks: 1247,
    totalConversions: 89,
    conversionRate: 7.14,
    totalEarnings: 145000,
    averageOrderValue: 165000,
    topProducts: [
      { name: 'Laptop HP Pavilion 15', clicks: 456, conversions: 32, earnings: 52000 },
      { name: 'Smartphone Samsung', clicks: 234, conversions: 18, earnings: 29000 },
      { name: 'Tailleur Femme', clicks: 198, conversions: 15, earnings: 24000 },
    ],
    dailyStats: [
      { date: 'Lun', clicks: 45, conversions: 3, earnings: 4500 },
      { date: 'Mar', clicks: 52, conversions: 4, earnings: 6200 },
      { date: 'Mer', clicks: 38, conversions: 2, earnings: 3200 },
      { date: 'Jeu', clicks: 61, conversions: 5, earnings: 7800 },
      { date: 'Ven', clicks: 48, conversions: 4, earnings: 5600 },
      { date: 'Sam', clicks: 55, conversions: 5, earnings: 7200 },
      { date: 'Dim', clicks: 42, conversions: 3, earnings: 4500 },
    ],
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const maxClicks = Math.max(...stats.dailyStats.map(s => s.clicks))
  const maxEarnings = Math.max(...stats.dailyStats.map(s => s.earnings))

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3" />
                Statistiques détaillées
              </h1>
              <p className="text-gray-600">
                Analysez vos performances et optimisez vos revenus
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              >
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exporter</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Total de clics</h3>
            <p className="text-3xl font-black text-gray-900">{stats.totalClicks.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-2">+12% vs mois dernier</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Conversions</h3>
            <p className="text-3xl font-black text-gray-900">{stats.totalConversions}</p>
            <p className="text-xs text-gray-500 mt-2">Taux: {stats.conversionRate}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Gains totaux</h3>
            <p className="text-3xl font-black text-gray-900">{formatPrice(stats.totalEarnings)}</p>
            <p className="text-xs text-green-600 mt-2">+8% vs mois dernier</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Panier moyen</h3>
            <p className="text-3xl font-black text-gray-900">{formatPrice(stats.averageOrderValue)}</p>
            <p className="text-xs text-red-600 mt-2">-3% vs mois dernier</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graphique hebdomadaire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Performance hebdomadaire</h2>
            <div className="space-y-4">
              {stats.dailyStats.map((day, index) => (
                <div key={day.date} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">{day.date}</span>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>{day.clicks} clics</span>
                      <span>{day.conversions} conv.</span>
                      <span className="font-semibold text-primary-600">{formatPrice(day.earnings)}</span>
                    </div>
                  </div>
                  <div className="relative w-full h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg transition-all duration-500"
                      style={{ width: `${(day.clicks / maxClicks) * 100}%` }}
                    />
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500/30 to-green-600/30 rounded-lg transition-all duration-500"
                      style={{ width: `${(day.earnings / maxEarnings) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top produits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Top produits</h2>
            <div className="space-y-4">
              {stats.topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <div className="flex items-center space-x-3 text-xs text-gray-600 mt-1">
                        <span>{product.clicks} clics</span>
                        <span>•</span>
                        <span>{product.conversions} conversions</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent-600">{formatPrice(product.earnings)}</p>
                    <p className="text-xs text-gray-500">
                      {((product.conversions / product.clicks) * 100).toFixed(1)}% taux
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AffiliateStats
