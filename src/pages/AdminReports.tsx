import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Calendar, Filter } from 'lucide-react'

const AdminReports = () => {
  const [selectedReport, setSelectedReport] = useState<string>('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const reportTypes = [
    {
      id: 'sales',
      name: 'Rapport des ventes',
      description: 'Analyse détaillée des ventes par période',
      icon: '💰',
    },
    {
      id: 'products',
      name: 'Rapport des produits',
      description: 'Performance des produits en vente',
      icon: '📦',
    },
    {
      id: 'customers',
      name: 'Rapport des clients',
      description: 'Statistiques et comportement des clients',
      icon: '👥',
    },
    {
      id: 'affiliates',
      name: 'Rapport des affiliés',
      description: 'Performance et commissions des affiliés',
      icon: '🤝',
    },
  ]

  const generateReport = () => {
    // TODO: Implémenter la génération de rapport
    alert(`Génération du rapport ${selectedReport} en cours...`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
              <FileText className="w-8 h-8 mr-3" />
              Rapports
            </h1>
            <p className="text-gray-600">
              Générez et téléchargez des rapports détaillés
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            {/* Type de rapport */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Type de rapport</h2>
              <div className="space-y-3">
                {reportTypes.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedReport === report.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-3xl">{report.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                      {selectedReport === report.id && (
                        <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Période */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Période
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date de début</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date de fin</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Actions</h2>
              <button
                onClick={generateReport}
                disabled={!selectedReport}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                  selectedReport
                    ? 'btn-primary'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Download className="w-5 h-5" />
                <span>Générer le rapport</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-4">Rapports récents</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/10 rounded-lg">
                  <p className="font-semibold text-sm mb-1">Rapport ventes - Décembre</p>
                  <p className="text-xs text-white/75">21 Déc 2024</p>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <p className="font-semibold text-sm mb-1">Rapport produits - Novembre</p>
                  <p className="text-xs text-white/75">30 Nov 2024</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminReports
