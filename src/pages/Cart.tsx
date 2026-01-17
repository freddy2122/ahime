import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const subtotal = getTotalPrice()
  const shipping = 5000 // Frais de livraison fixe
  const total = subtotal + shipping

  if (cartItems.length === 0) {
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
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Ajoutez des produits à votre panier pour continuer vos achats
            </p>
            <Link
              to="/boutique"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Continuer mes achats</span>
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
          className="mb-8"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Mon Panier
          </h1>
          <p className="text-gray-600 text-lg">
            {cartItems.length} {cartItems.length > 1 ? 'articles' : 'article'} dans votre panier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => {
              const price = item.isOnSale && item.promoPrice ? item.promoPrice : item.price
              const itemTotal = price * item.quantity

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 bg-gray-100 overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.isOnSale && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg z-10 border border-accent-400">
                          PROMO
                        </div>
                      )}
                    </Link>

                    {/* Détails */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1 mb-4 sm:mb-0">
                        <Link
                          to={`/product/${item.id}`}
                          className="block mb-2"
                        >
                          <h3 className="font-semibold text-lg text-gray-900 hover:text-primary-600 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        
                        {/* Prix */}
                        <div className="flex items-center space-x-2 mb-3">
                          {item.isOnSale && item.promoPrice ? (
                            <>
                              <span className="text-lg font-bold text-primary-600">
                                {formatPrice(item.promoPrice)}
                              </span>
                              <span className="text-sm font-semibold text-red-500 line-through">
                                {formatPrice(item.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-primary-600">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>

                        {/* Quantité */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">Quantité :</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                              aria-label="Diminuer la quantité"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                              aria-label="Augmenter la quantité"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Prix total et suppression */}
                      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600 mb-1">Total</p>
                          <p className="text-xl font-bold text-primary-600">
                            {formatPrice(itemTotal)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Supprimer du panier"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Bouton vider le panier */}
            <div className="flex justify-end pt-4">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 font-semibold transition-colors"
              >
                Vider le panier
              </button>
            </div>
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6 sticky top-24"
            >
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                Résumé de commande
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="font-semibold">{formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-primary-600">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
              >
                <span>Passer la commande</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/boutique"
                className="block w-full text-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                Continuer mes achats
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
