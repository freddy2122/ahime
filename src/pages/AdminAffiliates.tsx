import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserCheck, Search, Filter, Mail, TrendingUp, Eye, Download } from 'lucide-react'

const AdminAffiliates = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending'>('all')

  // TODO: Récupérer depuis Supabase
  const affiliates = [
    {
      id: 'AFF-001',
      name: 'Pierre Koffi',
      email: 'pierre.koffi@example.com',
      code: 'AFF-PK001',
      status: 'active',
      clicks: 234,
      conversions: 45,
      commissionRate: 10,
      totalEarned: 125000,
      pendingAmount: 35000,
      joinedDate: '2024-03-10',
    },
    {
      id: 'AFF-002',
      name: 'Marie Togo',
      email: 'marie.togo@example.com',
      code: 'AFF-MT002',
      status: 'active',
      clicks: 189,
      conversions: 32,
      commissionRate: 10,
      totalEarned: 89000,
      pendingAmount: 22000,
      joinedDate: '2024-04-15',
    },
    {
      id: 'AFF-003',
      name: 'Jean Martin',
      email: 'jean.martin@example.com',
      code: 'AFF-JM003',
      status: 'pending',
      clicks: 56,
      conversions: 8,
      commissionRate: 10,
      totalEarned: 0,
      pendingAmount: 12000,
      joinedDate: '2024-11-20',
    },
  ]

  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || affiliate.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const conversionRate = (clicks: number, conversions: number) => {
    if (clicks === 0) return 0
    return ((conversions / clicks) * 100).toFixed(2)
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
                <UserCheck className="w-8 h-8 mr-3" />
                Gestion des affiliés
              </h1>
              <p className="text-gray-600">
                Gérez vos partenaires affiliés et leurs commissions
              </p>
            </div>
            <button className="btn-secondary flex items-center space-x-2 mt-4 md:mt-0">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
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
                placeholder="Rechercher un affilié..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="pending">En attente</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {filteredAffiliates.length} affilié(s) trouvé(s)
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Affilié</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Code</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Statut</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Clics</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Conversions</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Taux</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Gagné</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">En attente</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAffiliates.map((affiliate) => (
                  <tr key={affiliate.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="font-semibold text-purple-600">
                            {affiliate.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{affiliate.name}</p>
                          <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                            <Mail className="w-3 h-3" />
                            <span>{affiliate.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm text-gray-900">{affiliate.code}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {affiliate.status === 'active' ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Actif
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          En attente
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-gray-600">{affiliate.clicks}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-gray-900">{affiliate.conversions}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-gray-600">
                        {conversionRate(affiliate.clicks, affiliate.conversions)}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <p className="font-semibold text-green-600">{formatPrice(affiliate.totalEarned)}</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <p className="font-semibold text-yellow-600">{formatPrice(affiliate.pendingAmount)}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                          aria-label="Voir détails"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminAffiliates
