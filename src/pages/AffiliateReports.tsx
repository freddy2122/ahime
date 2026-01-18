import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Calendar, Filter, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react'

const AffiliateReports = () => {
  const [selectedReport, setSelectedReport] = useState<'monthly' | 'product' | 'performance'>('monthly')

  // TODO: Récupérer depuis Supabase
  const reports = {
    monthly: [
      { month: 'Novembre 2024', clicks: 1247, conversions: 89, earnings: 145000 },
      { month: 'Octobre 2024', clicks: 1105, conversions: 78, earnings: 128000 },
      { month: 'Septembre 2024', clicks: 987, conversions: 65, earnings: 98000 },
    ],
    product: [
      { product: 'Laptop HP Pavilion 15', clicks: 456, conversions: 32, earnings: 52000, rate: 7.0 },
      { product: 'Smartphone Samsung', clicks: 234, conversions: 18, earnings: 29000, rate: 7.7 },
      { product: 'Tailleur Femme', clicks: 198, conversions: 15, earnings: 24000, rate: 7.6 },
      { product: 'Réfrigérateur LG', clicks: 167, conversions: 12, earnings: 21000, rate: 7.2 },
      { product: 'TV Samsung 55"', clicks: 145, conversions: 10, earnings: 18000, rate: 6.9 },
    ],
    performance: {
      bestDay: 'Jeudi',
      bestHour: '18h-20h',
      bestChannel: 'Réseaux sociaux',
      averageConversionTime: '2.5 jours',
    },
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
                <FileText className="w-8 h-8 mr-3" />
                Rapports d'affiliation
              </h1>
              <p className="text-gray-600">
                Analysez vos performances détaillées
              </p>
            </div>
            <button className="btn-primary flex items-center space-x-2 mt-4 md:mt-0">
              <Download className="w-4 h-4" />
              <span>Exporter PDF</span>
            </button>
          </div>
        </motion.div>

        {/* Sélecteur de rapport */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <button
              onClick={() => setSelectedReport('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedReport === 'monthly'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setSelectedReport('product')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedReport === 'product'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Par produit
            </button>
            <button
              onClick={() => setSelectedReport('performance')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedReport === 'performance'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Performance
            </button>
          </div>
        </motion.div>

        {/* Rapport mensuel */}
        {selectedReport === 'monthly' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto"
          >
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Rapport mensuel</h2>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Mois</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Clics</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Conversions</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Taux</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Gains</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Évolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.monthly.map((report, index) => {
                  const prevReport = index < reports.monthly.length - 1 ? reports.monthly[index + 1] : null
                  const evolution = prevReport ? ((report.earnings - prevReport.earnings) / prevReport.earnings * 100).toFixed(1) : null
                  return (
                    <tr key={report.month} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-semibold text-gray-900">{report.month}</td>
                      <td className="py-4 px-6 text-sm text-gray-600 text-right">{report.clicks.toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm text-gray-600 text-right">{report.conversions}</td>
                      <td className="py-4 px-6 text-sm text-gray-600 text-right">
                        {((report.conversions / report.clicks) * 100).toFixed(2)}%
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-primary-600 text-right">{formatPrice(report.earnings)}</td>
                      <td className="py-4 px-6 text-sm text-right">
                        {evolution && (
                          <span className={`flex items-center justify-end space-x-1 ${parseFloat(evolution) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <TrendingUp className={`w-4 h-4 ${parseFloat(evolution) < 0 ? 'rotate-180' : ''}`} />
                            <span>{Math.abs(parseFloat(evolution))}%</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Rapport par produit */}
        {selectedReport === 'product' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto"
          >
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Performance par produit</h2>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Produit</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Clics</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Conversions</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Taux</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Gains</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.product.map((product) => (
                  <tr key={product.product} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">{product.product}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-right">{product.clicks.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-right">{product.conversions}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-right">{product.rate}%</td>
                    <td className="py-4 px-6 text-sm font-bold text-primary-600 text-right">{formatPrice(product.earnings)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Rapport de performance */}
        {selectedReport === 'performance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Analyse de performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Meilleur jour
                </h3>
                <p className="text-3xl font-black text-blue-700">{reports.performance.bestDay}</p>
                <p className="text-sm text-gray-600 mt-2">Jour le plus performant</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Meilleure heure
                </h3>
                <p className="text-3xl font-black text-green-700">{reports.performance.bestHour}</p>
                <p className="text-sm text-gray-600 mt-2">Plage horaire optimale</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-purple-600" />
                  Meilleur canal
                </h3>
                <p className="text-3xl font-black text-purple-700">{reports.performance.bestChannel}</p>
                <p className="text-sm text-gray-600 mt-2">Canal le plus efficace</p>
              </div>

              <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6 border-2 border-accent-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-accent-600" />
                  Temps de conversion
                </h3>
                <p className="text-3xl font-black text-accent-700">{reports.performance.averageConversionTime}</p>
                <p className="text-sm text-gray-600 mt-2">Délai moyen clic → achat</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AffiliateReports
