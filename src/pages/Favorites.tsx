import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'
import { toast } from 'react-hot-toast'

const Favorites = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites()
  const { addToCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-200 mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Vos favoris sont vides
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Ajoutez des produits à vos favoris pour les retrouver facilement
            </p>
            <Link
              to="/boutique"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Découvrir nos produits</span>
            </Link>
          </motion.div>
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
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
              Mes Favoris
            </h1>
            <p className="text-gray-600 text-lg">
              {favorites.length} {favorites.length > 1 ? 'produits' : 'produit'} dans vos favoris
            </p>
          </div>
          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="text-red-500 hover:text-red-600 font-semibold transition-colors hidden md:block"
            >
              Tout supprimer
            </button>
          )}
        </motion.div>

        {/* Grille de produits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {favorites.map((product, index) => {
            const price = product.isOnSale && product.promoPrice ? product.promoPrice : product.price

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {product.isOnSale && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-xl z-10 border border-accent-400">
                          PROMO
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Épuisé
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Bouton retirer des favoris */}
                  <button
                    onClick={() => {
                      removeFromFavorites(product.id)
                      toast.success('Retiré des favoris')
                    }}
                    className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors z-10"
                    aria-label="Retirer des favoris"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>

                <div className="p-4 sm:p-5">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 text-gray-900 hover:text-primary-600 transition-colors min-h-[3rem]">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Prix */}
                  <div className="flex items-center space-x-2 mb-3">
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

                  {/* Boutons d'action */}
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        if (product.stock > 0) {
                          addToCart(product, 1)
                          toast.success(`${product.name} ajouté au panier`)
                        }
                      }}
                      disabled={product.stock === 0}
                      className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{product.stock > 0 ? 'Ajouter au panier' : 'Épuisé'}</span>
                    </button>
                    <button
                      onClick={() => {
                        removeFromFavorites(product.id)
                        toast.success('Retiré des favoris')
                      }}
                      className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-red-500 font-semibold transition-colors text-sm sm:text-base"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Retirer</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bouton vider les favoris - Mobile */}
        {favorites.length > 0 && (
          <div className="flex justify-center pt-8 md:hidden">
            <button
              onClick={clearFavorites}
              className="text-red-500 hover:text-red-600 font-semibold transition-colors"
            >
              Tout supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
