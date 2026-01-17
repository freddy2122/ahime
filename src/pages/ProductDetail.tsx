import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, Star, Heart, X, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = products.find(p => p.id === id)
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0])
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0])
      }
    }
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit introuvable</h1>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Retour à la boutique
          </button>
        </div>
      </div>
    )
  }

  const allImages = product.images && product.images.length > 0 
    ? [product.image, ...product.images]
    : [product.image]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product, quantity)
      toast.success(`${quantity} x ${product.name} ajouté au panier`)
    } else {
      toast.error('Produit épuisé')
    }
  }

  const nextImage = () => {
    setDirection(1)
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setDirection(-1)
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const goToImage = (index: number) => {
    setDirection(index > selectedImageIndex ? 1 : -1)
    setSelectedImageIndex(index)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const slideTransition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galerie d'images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Image principale - Carousel */}
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                  className="absolute inset-0"
                >
                  <img
                    src={allImages[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect fill="%23e5e7eb" width="600" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%239ca3af"%3EImage%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Badge promo */}
              {product.isOnSale && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-xl z-20">
                  PROMO
                </div>
              )}

              {/* Badge épuisé */}
              {product.stock === 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold z-20">
                  Épuisé
                </div>
              )}

              {/* Bouton favoris */}
              <button
                onClick={() => {
                  toggleFavorite(product)
                  toast.success(
                    isFavorite(product.id)
                      ? 'Retiré des favoris'
                      : 'Ajouté aux favoris'
                  )
                }}
                className={`absolute ${product.stock === 0 ? 'top-20' : 'top-4'} right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors z-20 ${
                  isFavorite(product.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
                aria-label={isFavorite(product.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Heart className={`w-6 h-6 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
              </button>

              {/* Navigation images si plusieurs */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all z-20 hover:scale-110"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all z-20 hover:scale-110"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Indicateurs de position */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === selectedImageIndex
                            ? 'bg-accent-500 w-8 h-2 border-2 border-white'
                            : 'bg-white/60 w-2 h-2 hover:bg-white/80 border border-white/50'
                        }`}
                        aria-label={`Aller à l'image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Miniatures */}
            {allImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-primary-600 ring-2 ring-primary-200 scale-105'
                        : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} vue ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23e5e7eb" width="80" height="80"/%3E%3C/svg%3E'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Informations produit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-accent-400 text-accent-400" />
                    <span className="ml-1 text-gray-700 font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({product.stock} en stock)</span>
                </div>
              )}

              {/* Prix */}
              <div className="mb-6">
                {product.isOnSale && product.promoPrice ? (
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                      <span className="text-2xl md:text-3xl lg:text-4xl font-black text-primary-600">
                        {formatPrice(product.promoPrice)}
                      </span>
                      <span className="text-lg md:text-xl font-semibold text-red-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-bold w-fit">
                      -{Math.round(((product.price - product.promoPrice) / product.price) * 100)}%
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl md:text-3xl lg:text-4xl font-black text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-semibold text-lg text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Sélecteur de couleur */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Couleur: <span className="text-primary-600">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
                        selectedColor === color
                          ? 'bg-primary-600 text-white border-primary-600 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sélecteur de taille */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Taille: <span className="text-primary-600">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg font-semibold transition-all border-2 ${
                        selectedSize === size
                          ? 'bg-primary-600 text-white border-primary-600 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantité */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantité</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <span className="text-gray-600 text-sm">Max: {product.stock}</span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.stock > 0 ? 'Ajouter au panier' : 'Épuisé'}</span>
              </button>
            </div>

            {/* Informations supplémentaires */}
            <div className="pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Stock:</span>
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `${product.stock} disponibles` : 'Épuisé'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Catégorie:</span>
                <span className="text-primary-600 capitalize">{product.category.replace('-', ' ')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
