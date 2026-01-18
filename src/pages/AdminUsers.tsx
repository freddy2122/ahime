import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Filter, Mail, Phone, Calendar, UserCheck, UserX, Eye, Download } from 'lucide-react'

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')

  // TODO: Récupérer depuis Supabase
  const users = [
    {
      id: 'USR-001',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '+229 67 12 34 56',
      role: 'customer',
      status: 'active',
      createdAt: '2024-01-15',
      orders: 12,
      totalSpent: 450000,
    },
    {
      id: 'USR-002',
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      phone: '+229 96 78 90 12',
      role: 'customer',
      status: 'active',
      createdAt: '2024-02-20',
      orders: 8,
      totalSpent: 320000,
    },
    {
      id: 'USR-003',
      name: 'Pierre Koffi',
      email: 'pierre.koffi@example.com',
      phone: '+229 97 65 43 21',
      role: 'affiliate',
      status: 'active',
      createdAt: '2024-03-10',
      orders: 5,
      totalSpent: 150000,
    },
    {
      id: 'USR-004',
      name: 'Sophie Togo',
      email: 'sophie.togo@example.com',
      phone: '+229 66 11 22 33',
      role: 'customer',
      status: 'inactive',
      createdAt: '2023-12-05',
      orders: 0,
      totalSpent: 0,
    },
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const getRoleBadge = (role: string) => {
    const styles = {
      customer: 'bg-blue-100 text-blue-700',
      affiliate: 'bg-purple-100 text-purple-700',
      admin: 'bg-red-100 text-red-700',
    }
    const labels = {
      customer: 'Client',
      affiliate: 'Affilié',
      admin: 'Administrateur',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[role as keyof typeof styles]}`}>
        {labels[role as keyof typeof labels]}
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
                <Users className="w-8 h-8 mr-3" />
                Gestion des utilisateurs
              </h1>
              <p className="text-gray-600">
                Gérez les utilisateurs de votre plateforme
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
                placeholder="Rechercher un utilisateur..."
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
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {filteredUsers.length} utilisateur(s) trouvé(s)
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Utilisateur</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Contact</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Rôle</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Statut</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Commandes</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Total dépensé</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Inscription</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="font-semibold text-primary-600">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {user.status === 'active' ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center justify-center space-x-1">
                          <UserCheck className="w-4 h-4" />
                          <span>Actif</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center justify-center space-x-1">
                          <UserX className="w-4 h-4" />
                          <span>Inactif</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-gray-600">{user.orders}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <p className="font-semibold text-primary-600">{formatPrice(user.totalSpent)}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{user.createdAt}</span>
                      </div>
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

export default AdminUsers
