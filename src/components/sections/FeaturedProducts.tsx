import { Link } from 'react-router-dom'
import { ShoppingCart, Star, ArrowRight, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useFavorites } from '../../context/FavoritesContext'

const FeaturedProducts = () => {
  // Afficher les 6 premiers produits
  const featuredProducts = products.slice(0, 6)
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10 sm:mb-12 md:mb-16"
        >
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-primary-600 mb-4">
              Produits en Vedette
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl">
              Découvrez nos produits les plus populaires
            </p>
          </div>
          <Link
            to="/boutique"
            className="hidden md:flex items-center space-x-2 text-primary-600 hover:text-accent-500 font-semibold text-lg transition-colors group"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
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
                    <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 text-gray-900 group-hover:text-primary-600 transition-colors">
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
        </div>

        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Link
            to="/boutique"
            className="md:hidden btn-secondary inline-flex items-center space-x-2"
          >
            <span>Voir tous les produits</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
