import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Star, Heart, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

const CategoryProducts = () => {
  const { slug } = useParams<{ slug: string }>()
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // Mapper les slugs aux catégories réelles
  const categoryMap: { [key: string]: string } = {
    'electronique': 'electronique',
    'mode-vetements': 'mode-vetements',
    'maison-decoration': 'maison-decoration',
    'beaute-sante': 'beaute-sante',
    'alimentation': 'alimentation',
    'sport-loisirs': 'sport-loisirs',
  }

  const categoryNames: { [key: string]: string } = {
    'electronique': 'Électronique',
    'mode-vetements': 'Mode & Vêtements',
    'maison-decoration': 'Maison & Décoration',
    'beaute-sante': 'Beauté & Santé',
    'alimentation': 'Alimentation',
    'sport-loisirs': 'Sport & Loisirs',
  }

  const category = slug ? categoryMap[slug] : null
  const categoryName = slug ? categoryNames[slug] || slug : 'Catégorie'

  // Filtrer les produits par catégorie
  const categoryProducts = category
    ? products.filter(p => p.category === category)
    : []

  // Calculer la pagination
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = categoryProducts.slice(startIndex, endIndex)

  // Réinitialiser à la page 1 quand la catégorie change
  useEffect(() => {
    setCurrentPage(1)
  }, [slug])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!category || categoryProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Catégorie introuvable</h1>
            <p className="text-gray-600 mb-6">Cette catégorie n'existe pas ou ne contient aucun produit.</p>
            <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Retour à la boutique</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à la boutique</span>
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            {categoryName}
          </h1>
          <p className="text-gray-600 text-lg">
            {categoryProducts.length} {categoryProducts.length > 1 ? 'produits disponibles' : 'produit disponible'}
          </p>
        </motion.div>

        {/* Grille de produits */}
        {categoryProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Aucun produit dans cette catégorie pour le moment.</p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
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
                          loading="lazy"
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
                        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base mt-3"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{product.stock > 0 ? 'Ajouter' : 'Épuisé'}</span>
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CategoryProducts
