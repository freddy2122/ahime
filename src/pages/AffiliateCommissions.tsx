import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Calendar, Filter, Download, CheckCircle, Clock, XCircle } from 'lucide-react'

const AffiliateCommissions = () => {
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all')

  // TODO: Récupérer depuis Supabase
  const commissions = [
    {
      id: '1',
      date: '2024-12-15',
      orderId: 'CMD-2024-001',
      customer: 'Jean Dupont',
      product: 'Laptop HP Pavilion 15',
      orderAmount: 50000,
      commissionRate: 15,
      commission: 7500,
      status: 'paid',
      paymentDate: '2024-12-20',
    },
    {
      id: '2',
      date: '2024-12-10',
      orderId: 'CMD-2024-002',
      customer: 'Marie Martin',
      product: 'Smartphone Samsung Galaxy A54',
      orderAmount: 149000,
      commissionRate: 12,
      commission: 17880,
      status: 'paid',
      paymentDate: '2024-12-18',
    },
    {
      id: '3',
      date: '2024-12-05',
      orderId: 'CMD-2024-003',
      customer: 'Pierre Koffi',
      product: 'Tailleur Femme',
      orderAmount: 45000,
      commissionRate: 12,
      commission: 5400,
      status: 'pending',
      paymentDate: null,
    },
    {
      id: '4',
      date: '2024-11-28',
      orderId: 'CMD-2024-004',
      customer: 'Sophie Togo',
      product: 'Réfrigérateur LG 280L',
      orderAmount: 320000,
      commissionRate: 12,
      commission: 38400,
      status: 'paid',
      paymentDate: '2024-12-15',
    },
    {
      id: '5',
      date: '2024-11-25',
      orderId: 'CMD-2024-005',
      customer: 'Koffi Yves',
      product: 'TV Samsung 55"',
      orderAmount: 280000,
      commissionRate: 15,
      commission: 42000,
      status: 'paid',
      paymentDate: '2024-12-15',
    },
    {
      id: '6',
      date: '2024-11-20',
      orderId: 'CMD-2024-006',
      customer: 'Aline Sèdè',
      product: 'Sac à Main Cuir',
      orderAmount: 35000,
      commissionRate: 10,
      commission: 3500,
      status: 'pending',
      paymentDate: null,
    },
  ]

  const filteredCommissions = filter === 'all'
    ? commissions
    : commissions.filter(c => c.status === filter)

  const totalEarnings = commissions
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.commission, 0)

  const pendingEarnings = commissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.commission, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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
                <DollarSign className="w-8 h-8 mr-3" />
                Mes commissions
              </h1>
              <p className="text-gray-600">
                Suivez l'historique et le statut de vos commissions
              </p>
            </div>
            <button className="btn-secondary flex items-center space-x-2 mt-4 md:mt-0">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
          </div>
        </motion.div>

        {/* Résumé */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8" />
              <span className="text-sm opacity-90">Total payé</span>
            </div>
            <p className="text-3xl font-black">{formatPrice(totalEarnings)}</p>
            <p className="text-sm opacity-75 mt-2">{commissions.filter(c => c.status === 'paid').length} commissions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8" />
              <span className="text-sm opacity-90">En attente</span>
            </div>
            <p className="text-3xl font-black">{formatPrice(pendingEarnings)}</p>
            <p className="text-sm opacity-75 mt-2">{commissions.filter(c => c.status === 'pending').length} commissions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8" />
              <span className="text-sm opacity-90">Total</span>
            </div>
            <p className="text-3xl font-black">{formatPrice(totalEarnings + pendingEarnings)}</p>
            <p className="text-sm opacity-75 mt-2">{commissions.length} commissions au total</p>
          </motion.div>
        </div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes ({commissions.length})
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'paid'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Payées ({commissions.filter(c => c.status === 'paid').length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'pending'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En attente ({commissions.filter(c => c.status === 'pending').length})
            </button>
          </div>
        </motion.div>

        {/* Table des commissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Commande</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Client</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Produit</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Montant</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Taux</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Commission</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Statut</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Paiement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCommissions.map((commission) => (
                  <tr key={commission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-600">{formatDate(commission.date)}</td>
                    <td className="py-4 px-6 text-sm font-mono text-gray-900">{commission.orderId}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{commission.customer}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{commission.product}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-right">{formatPrice(commission.orderAmount)}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-right">{commission.commissionRate}%</td>
                    <td className="py-4 px-6 text-sm font-bold text-primary-600 text-right">{formatPrice(commission.commission)}</td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          commission.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {commission.status === 'paid' ? 'Payé' : 'En attente'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{formatDate(commission.paymentDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {filteredCommissions.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune commission</h3>
            <p className="text-gray-600">Aucune commission trouvée pour ce filtre</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AffiliateCommissions
