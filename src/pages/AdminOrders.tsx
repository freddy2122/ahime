import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Search, Filter, Eye, CheckCircle, Clock, XCircle, Package, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all')

  // TODO: Récupérer depuis Supabase
  const orders = [
    {
      id: 'CMD-2024-001',
      customer: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      items: 2,
      amount: 50000,
      status: 'completed',
      date: '2024-12-21 14:30',
      paymentMethod: 'mobile_money',
    },
    {
      id: 'CMD-2024-002',
      customer: 'Marie Martin',
      email: 'marie.martin@example.com',
      items: 1,
      amount: 149000,
      status: 'pending',
      date: '2024-12-21 13:15',
      paymentMethod: 'card',
    },
    {
      id: 'CMD-2024-003',
      customer: 'Pierre Koffi',
      email: 'pierre.koffi@example.com',
      items: 3,
      amount: 45000,
      status: 'processing',
      date: '2024-12-21 12:00',
      paymentMethod: 'mobile_money',
    },
    {
      id: 'CMD-2024-004',
      customer: 'Sophie Togo',
      email: 'sophie.togo@example.com',
      items: 1,
      amount: 320000,
      status: 'completed',
      date: '2024-12-21 11:45',
      paymentMethod: 'bank_transfer',
    },
    {
      id: 'CMD-2024-005',
      customer: 'Koffi Yves',
      email: 'koffi.yves@example.com',
      items: 2,
      amount: 280000,
      status: 'cancelled',
      date: '2024-12-20 16:20',
      paymentMethod: 'card',
    },
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
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
                <ShoppingCart className="w-8 h-8 mr-3" />
                Gestion des commandes
              </h1>
              <p className="text-gray-600">
                Gérez et suivez toutes les commandes
              </p>
            </div>
            <button className="btn-secondary flex items-center space-x-2 mt-4 md:mt-0">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
          </div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une commande..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              />
            </div>

            {/* Filtre statut */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="processing">En cours</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {filteredOrders.length} commande(s) trouvée(s)
          </div>
        </motion.div>

        {/* Table des commandes */}
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Commande</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Client</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Articles</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Montant</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Paiement</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Statut</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-mono font-semibold text-gray-900">{order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{order.customer}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-600">{order.email}</p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-gray-600">{order.items} article(s)</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <p className="font-bold text-primary-600">{formatPrice(order.amount)}</p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-xs text-gray-600 capitalize">
                        {order.paymentMethod.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                          aria-label="Voir détails"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune commande trouvée</h3>
            <p className="text-gray-600">Aucune commande ne correspond à vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders
