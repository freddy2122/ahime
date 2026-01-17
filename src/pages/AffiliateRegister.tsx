import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, MapPin, CreditCard, Eye, EyeOff, Users, ArrowLeft, ChevronDown } from 'lucide-react'
import { toast } from 'react-hot-toast'

const AffiliateRegister = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const referralCode = searchParams.get('ref') || ''

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'mobile_money',
    mobileMoneyNumber: '',
    bankAccount: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    if (!formData.acceptTerms) {
      toast.error('Veuillez accepter les conditions d\'utilisation')
      return
    }

    if (formData.paymentMethod === 'mobile_money' && !formData.mobileMoneyNumber) {
      toast.error('Veuillez renseigner votre numéro Mobile Money')
      return
    }

    if (formData.paymentMethod === 'bank_transfer' && !formData.bankAccount) {
      toast.error('Veuillez renseigner vos coordonnées bancaires')
      return
    }

    setIsLoading(true)

    // TODO: Intégrer avec Supabase
    // Créer le compte utilisateur + compte affilié
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Inscription réussie ! Votre demande est en cours de validation.')
      navigate('/affiliate')
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* En-tête */}
            <div className="text-center mb-8">
              <Link
                to="/affiliate"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour au programme d'affiliation</span>
              </Link>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 mb-4">
                <Users className="w-8 h-8 text-accent-600" />
              </div>
              <h1 className="font-heading text-3xl font-black text-primary-600 mb-2">
                Inscription Parrain
              </h1>
              <p className="text-gray-600">
                Rejoignez notre programme d'affiliation et commencez à gagner des commissions
              </p>
              {referralCode && (
                <div className="mt-4 inline-block bg-accent-50 border-2 border-accent-200 rounded-lg px-4 py-2">
                  <p className="text-sm text-accent-700">
                    Code de parrainage : <span className="font-bold">{referralCode}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Formulaire */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {/* Informations personnelles */}
                <div>
                  <h2 className="font-heading text-lg md:text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Informations personnelles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="Prénom"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="Nom"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h2 className="font-heading text-lg md:text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Informations de contact
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Adresse email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="+229 XX XX XX XX"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                        Adresse
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="Votre adresse complète"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Méthode de paiement */}
                <div>
                  <h2 className="font-heading text-lg md:text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Méthode de paiement
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700 mb-2">
                        Comment souhaitez-vous recevoir vos commissions ? *
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                        <select
                          id="paymentMethod"
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                        >
                          <option value="mobile_money">Mobile Money</option>
                          <option value="bank_transfer">Virement bancaire</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    {formData.paymentMethod === 'mobile_money' && (
                      <div>
                        <label htmlFor="mobileMoneyNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                          Numéro Mobile Money *
                        </label>
                        <input
                          type="tel"
                          id="mobileMoneyNumber"
                          name="mobileMoneyNumber"
                          value={formData.mobileMoneyNumber}
                          onChange={handleChange}
                          required={formData.paymentMethod === 'mobile_money'}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="+229 XX XX XX XX"
                        />
                      </div>
                    )}
                    {formData.paymentMethod === 'bank_transfer' && (
                      <div>
                        <label htmlFor="bankAccount" className="block text-sm font-semibold text-gray-700 mb-2">
                          Coordonnées bancaires *
                        </label>
                        <textarea
                          id="bankAccount"
                          name="bankAccount"
                          value={formData.bankAccount}
                          onChange={handleChange}
                          required={formData.paymentMethod === 'bank_transfer'}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="Banque, IBAN, Nom du titulaire du compte..."
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Mot de passe */}
                <div>
                  <h2 className="font-heading text-lg md:text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Sécurité
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                        Mot de passe *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength={6}
                          className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirmer le mot de passe *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conditions */}
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      required
                      className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      J'accepte les{' '}
                      <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-semibold">
                        conditions d'utilisation
                      </Link>
                      {' '}et la{' '}
                      <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-semibold">
                        politique de confidentialité
                      </Link>
                      {' '}du programme d'affiliation
                    </span>
                  </label>
                </div>

                {/* Bouton d'inscription */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-accent flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
                >
                  {isLoading ? (
                    <span>Soumission en cours...</span>
                  ) : (
                    <>
                      <Users className="w-5 h-5" />
                      <span>S'inscrire comme parrain</span>
                    </>
                  )}
                </button>
              </form>

              {/* Lien de connexion */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-2">
                  Vous avez déjà un compte parrain ?
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  <span>Se connecter</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AffiliateRegister
