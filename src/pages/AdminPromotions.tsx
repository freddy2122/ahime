import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tag, Plus, Search, Edit, Trash2, Calendar, Percent, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminPromotions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'expired'>('all')

  // TODO: Récupérer depuis Supabase
  const promotions = [
    {
      id: 'PROM-001',
      name: 'Soldes d\'hiver 2024',
      code: 'HIVER2024',
      type: 'percentage',
      value: 25,
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      status: 'active',
      usageCount: 45,
      maxUsage: 100,
    },
    {
      id: 'PROM-002',
      name: 'Black Friday',
      code: 'BLACKFRIDAY',
      type: 'percentage',
      value: 50,
      startDate: '2024-11-24',
      endDate: '2024-11-30',
      status: 'expired',
      usageCount: 89,
      maxUsage: 100,
    },
    {
      id: 'PROM-003',
      name: 'Réduction fixe',
      code: 'REDUC5000',
      type: 'fixed',
      value: 5000,
      startDate: '2024-12-15',
      endDate: '2024-12-25',
      status: 'active',
      usageCount: 12,
      maxUsage: 50,
    },
  ]

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || promo.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      expired: 'bg-red-100 text-red-700',
    }
    const labels = {
      active: 'Active',
      inactive: 'Inactive',
      expired: 'Expirée',
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
                <Tag className="w-8 h-8 mr-3" />
                Gestion des promotions
              </h1>
              <p className="text-gray-600">
                Gérez les codes promo et réductions
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
              <Link to="/admin/promotions/new" className="btn-primary flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Créer une promotion</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une promotion..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expirée</option>
            </select>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {filteredPromotions.length} promotion(s) trouvée(s)
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map((promo) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">{promo.name}</h3>
                  <span className="font-mono text-sm text-primary-600 font-semibold">{promo.code}</span>
                </div>
                {getStatusBadge(promo.status)}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  {promo.type === 'percentage' ? (
                    <Percent className="w-5 h-5 text-accent-500" />
                  ) : (
                    <Tag className="w-5 h-5 text-accent-500" />
                  )}
                  <span className="text-lg font-bold text-accent-600">
                    {promo.type === 'percentage' ? `${promo.value}%` : `${promo.value} XOF`}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Du {promo.startDate} au {promo.endDate}</span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Utilisations</span>
                    <span className="font-semibold text-gray-900">{promo.usageCount}/{promo.maxUsage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-accent-500 h-2 rounded-full"
                      style={{ width: `${(promo.usageCount / promo.maxUsage) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Modifier</span>
                </button>
                <button className="w-10 h-10 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPromotions.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune promotion trouvée</h3>
            <p className="text-gray-600 mb-4">Aucune promotion ne correspond à vos critères de recherche</p>
            <Link to="/admin/promotions/new" className="btn-primary inline-flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Créer une promotion</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPromotions
