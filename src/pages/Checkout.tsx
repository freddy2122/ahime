import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MapPin, Phone, Mail, CreditCard, Lock, ArrowLeft, CheckCircle,
  User, Building, Truck, Shield
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, clearCart, getTotalPrice } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Bénin',
  })

  const [paymentMethod, setPaymentMethod] = useState('mobile_money')
  const [paymentInfo, setPaymentInfo] = useState({
    mobileMoneyNumber: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  const subtotal = getTotalPrice()
  const shipping = 5000 // Frais de livraison fixes
  const total = subtotal + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // TODO: Intégrer avec l'API de paiement
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep(3)
      clearCart()
      toast.success('Commande passée avec succès !')
    }, 2000)
  }

  if (cartItems.length === 0 && currentStep !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-6">Ajoutez des produits à votre panier avant de passer commande.</p>
            <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
              <span>Continuer les achats</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0 flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="font-heading text-3xl font-black text-primary-600 mb-4">
                Commande confirmée !
              </h1>
              <p className="text-gray-600 mb-6 text-lg">
                Merci pour votre achat. Nous avons reçu votre commande et vous enverrons un email de confirmation sous peu.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Détails de la commande</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Email:</strong> {shippingInfo.email}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Téléphone:</strong> {shippingInfo.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Adresse:</strong> {shippingInfo.address}, {shippingInfo.city}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="btn-primary inline-flex items-center justify-center space-x-2"
                >
                  <span>Continuer les achats</span>
                </Link>
                <Link
                  to="/"
                  className="btn-secondary inline-flex items-center justify-center space-x-2"
                >
                  <span>Retour à l'accueil</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="mb-8">
            <Link
              to="/cart"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour au panier</span>
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2">
              Finaliser la commande
            </h1>
            <p className="text-gray-600">Remplissez les informations pour compléter votre commande</p>
          </div>

          {/* Indicateur d'étapes */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  1
                </div>
                <span className="ml-2 font-semibold hidden sm:inline">Livraison</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  2
                </div>
                <span className="ml-2 font-semibold hidden sm:inline">Paiement</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Truck className="w-6 h-6 mr-2 text-primary-600" />
                    Informations de livraison
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Prénom *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={shippingInfo.firstName}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                            placeholder="Prénom"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={shippingInfo.lastName}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                            placeholder="Nom"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                          placeholder="+229 XX XX XX XX"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Adresse *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          required
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                          placeholder="Adresse complète"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Ville *
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                            placeholder="Ville"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Code postal
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                          placeholder="Code postal"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full btn-primary mt-6 py-4 text-lg"
                    >
                      Continuer vers le paiement
                    </button>
                  </form>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <CreditCard className="w-6 h-6 mr-2 text-primary-600" />
                    Méthode de paiement
                  </h2>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    {/* Sélection méthode */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Choisissez votre méthode de paiement
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('mobile_money')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            paymentMethod === 'mobile_money'
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-semibold text-gray-900 mb-1">Mobile Money</div>
                          <div className="text-sm text-gray-600">MTN, Moov, Flooz</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            paymentMethod === 'card'
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-semibold text-gray-900 mb-1">Carte bancaire</div>
                          <div className="text-sm text-gray-600">Visa, Mastercard</div>
                        </button>
                      </div>
                    </div>

                    {/* Informations de paiement */}
                    {paymentMethod === 'mobile_money' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Numéro Mobile Money *
                        </label>
                        <input
                          type="tel"
                          required
                          value={paymentInfo.mobileMoneyNumber}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, mobileMoneyNumber: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                          placeholder="+229 XX XX XX XX"
                        />
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Numéro de carte *
                          </label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              required
                              maxLength={19}
                              value={paymentInfo.cardNumber}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nom sur la carte *
                          </label>
                          <input
                            type="text"
                            required
                            value={paymentInfo.cardName}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                            placeholder="NOM PRENOM"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Date d'expiration *
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={5}
                              value={paymentInfo.expiryDate}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={3}
                              value={paymentInfo.cvv}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span>Vos informations de paiement sont sécurisées et cryptées</span>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 btn-secondary py-4"
                      >
                        Retour
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Traitement...' : `Payer ${formatPrice(total)}`}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">
                  Résumé de commande
                </h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-600">Qté: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-primary-600">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span className="font-semibold">{formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-primary-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
