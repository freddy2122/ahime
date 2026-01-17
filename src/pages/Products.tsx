import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Search, Filter, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  // Obtenir les catégories uniques
  const categories = ['all', ...new Set(products.map(p => p.category))]

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Réinitialiser à la page 1 quand on change de filtre
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  // Calculer la pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Fonctions de pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToPrevious = () => goToPage(currentPage - 1)
  const goToNext = () => goToPage(currentPage + 1)

  const getCategoryName = (slug: string) => {
    const names: { [key: string]: string } = {
      'all': 'Toutes les catégories',
      'electronique': 'Électronique',
      'mode-vetements': 'Mode & Vêtements',
      'maison-decoration': 'Maison & Décoration',
      'beaute-sante': 'Beauté & Santé',
      'alimentation': 'Alimentation',
      'sport-loisirs': 'Sport & Loisirs',
    }
    return names[slug] || slug
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-16 lg:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Notre Boutique
          </h1>
          <p className="text-gray-600 text-lg">
            Découvrez notre sélection complète de produits
          </p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8 space-y-4"
        >
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg"
            />
          </div>

          {/* Filtres par catégorie */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {getCategoryName(category)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Résultats */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length > 1 ? 'produits trouvés' : 'produit trouvé'}
          </p>
          {filteredProducts.length > 0 && (
            <p className="text-gray-600 text-sm">
              Page {currentPage} sur {totalPages}
            </p>
          )}
        </div>

        {/* Grille de produits */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-2">Aucun produit trouvé</p>
            <p className="text-gray-500 text-sm">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23e5e7eb" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%239ca3af"%3EImage%3C/text%3E%3C/svg%3E'
                      }}
                    />
                    {product.isOnSale && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-xl z-10 border border-accent-400">
                        PROMO
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
                        Épuisé
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleFavorite(product)
                        toast.success(
                          isFavorite(product.id)
                            ? 'Retiré des favoris'
                            : 'Ajouté aux favoris'
                        )
                      }}
                      className={`absolute ${product.stock === 0 ? 'bottom-2 right-2' : 'top-2 right-2'} w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors z-10 ${
                        isFavorite(product.id)
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                      }`}
                      aria-label={isFavorite(product.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 text-gray-900 group-hover:text-primary-600 transition-colors min-h-[3rem]">
                      {product.name}
                    </h3>
                    <div className="flex flex-col mb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0 mb-2">
                        {product.isOnSale && product.promoPrice ? (
                          <>
                            <span className="text-base sm:text-lg font-bold text-primary-600">
                              {formatPrice(product.promoPrice)}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-red-500 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-base sm:text-lg font-bold text-primary-600">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      {product.rating && (
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (product.stock > 0) {
                          addToCart(product, 1)
                          toast.success(`${product.name} ajouté au panier`)
                        }
                      }}
                      disabled={product.stock === 0}
                      className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{product.stock > 0 ? 'Ajouter' : 'Épuisé'}</span>
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {filteredProducts.length > productsPerPage && (
          <div className="mt-10 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              {/* Bouton Précédent */}
              <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Précédent</span>
              </button>

              {/* Numéros de pages */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Afficher seulement les pages proches de la page actuelle
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 text-gray-400">
                        ...
                      </span>
                    )
                  }
                  return null
                })}
              </div>

              {/* Bouton Suivant */}
              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                }`}
              >
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
