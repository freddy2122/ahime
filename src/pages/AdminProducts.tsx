import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Plus, Search, Edit, Trash2, Eye, Filter, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...new Set(products.map(p => p.category))]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      'electronique': 'Électronique',
      'mode-vetements': 'Mode & Vêtements',
      'maison-decoration': 'Maison & Décoration',
      'beaute-sante': 'Beauté & Santé',
      'alimentation': 'Alimentation',
      'sport-loisirs': 'Sport & Loisirs',
    }
    return names[category] || category
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
                <Package className="w-8 h-8 mr-3" />
                Gestion des produits
              </h1>
              <p className="text-gray-600">
                Gérez votre catalogue de produits
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
              <Link to="/admin/products/new" className="btn-primary flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Ajouter un produit</span>
              </Link>
            </div>
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
                placeholder="Rechercher un produit..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              />
            </div>

            {/* Filtre catégorie */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              >
                <option value="all">Toutes les catégories</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>
                    {getCategoryName(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {filteredProducts.length} produit(s) trouvé(s)
          </div>
        </motion.div>

        {/* Table des produits */}
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Produit</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Catégorie</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Prix</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Stock</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Statut</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || 'https://via.placeholder.com/300'}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                          loading="lazy"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 break-words">{product.name}</p>
                          <p className="text-xs text-gray-500 break-words mt-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {getCategoryName(product.category)}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-primary-600 text-right">
                      {product.isOnSale && product.promoPrice ? (
                        <div className="flex flex-col items-end">
                          <span>{formatPrice(product.promoPrice)}</span>
                          <span className="text-xs text-red-500 line-through">{formatPrice(product.price)}</span>
                        </div>
                      ) : (
                        formatPrice(product.price)
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 10
                          ? 'bg-green-100 text-green-700'
                          : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {product.isOnSale && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700">
                          PROMO
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/product/${product.id}`}
                          target="_blank"
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          aria-label="Voir"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </Link>
                        <button
                          className="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                          aria-label="Modifier"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 mb-4">Aucun produit ne correspond à vos critères de recherche</p>
            <Link to="/admin/products/new" className="btn-primary inline-flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Ajouter un produit</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProducts
