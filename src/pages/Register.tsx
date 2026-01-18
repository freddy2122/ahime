import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, Eye, EyeOff, UserPlus } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { authService } from '../services/authService'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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

    setIsLoading(true)

    try {
      console.log('🔄 ===== DÉBUT INSCRIPTION =====')
      console.log('📧 Email:', formData.email)
      console.log('👤 Nom:', formData.firstName, formData.lastName)
      
      // Vérifier la configuration Supabase
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      console.log('🔍 Vérification configuration:')
      console.log('  - URL:', supabaseUrl ? supabaseUrl.substring(0, 40) + '...' : '❌ MANQUANT')
      console.log('  - Key:', supabaseKey ? '✅ Présente (' + supabaseKey.substring(0, 20) + '...)' : '❌ MANQUANTE')
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        const errorMsg = 'Configuration Supabase manquante. Vérifiez votre fichier .env dans frontend/ et redémarrez le serveur.'
        console.error('❌', errorMsg)
        toast.error(errorMsg, { duration: 8000 })
        return
      }

      // Créer le compte avec Supabase Auth
      console.log('📤 Appel de authService.signUp...')
      const { data, error } = await authService.signUp({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
      })

      console.log('📥 Réponse complète de Supabase:')
      console.log('  - Data:', data)
      console.log('  - Error:', error)
      console.log('  - User ID:', data?.user?.id)
      console.log('  - User Email:', data?.user?.email)
      console.log('  - Session:', data?.session ? '✅' : '❌')

      if (error) {
        console.error('❌ Erreur Supabase détectée:', error)
        throw error
      }

      if (!data) {
        console.error('❌ Aucune donnée retournée')
        throw new Error('Aucune donnée retournée par Supabase')
      }

      if (!data.user) {
        console.error('❌ Pas de user dans la réponse')
        throw new Error('Aucun utilisateur créé')
      }

      console.log('✅ Compte créé avec succès!')
      console.log('  - User ID:', data.user.id)
      console.log('  - Email:', data.user.email)
      console.log('  - Email confirmé:', data.user.email_confirmed_at ? '✅' : '❌ (confirmation requise)')

      // Vérifier si l'email doit être confirmé
      if (data.user && !data.session) {
        console.log('📧 Email de confirmation requis - redirection vers login')
        toast.success('Compte créé ! Vérifiez votre email pour confirmer votre compte.', {
          duration: 5000,
        })
        navigate('/login')
      } else if (data.user && data.session) {
        console.log('✅ Compte créé et session active - redirection vers accueil')
        toast.success('Compte créé avec succès !')
        navigate('/')
      } else {
        console.warn('⚠️ Situation inattendue')
        toast.success('Compte créé ! Vérifiez votre email si la confirmation est activée.')
        navigate('/login')
      }
      
      console.log('🔄 ===== FIN INSCRIPTION =====')
    } catch (error: any) {
      console.error('❌ Erreur complète lors de l\'inscription:', error)
      console.error('Type d\'erreur:', error?.constructor?.name)
      console.error('Message:', error?.message)
      console.error('Code:', error?.code)
      console.error('Status:', error?.status)
      
      // Messages d'erreur personnalisés
      let errorMessage = 'Une erreur est survenue lors de l\'inscription'
      
      if (error?.message?.includes('Configuration Supabase')) {
        errorMessage = error.message
      } else if (error?.message?.includes('already registered') || error?.code === '23505') {
        errorMessage = 'Cet email est déjà utilisé. Connectez-vous ou utilisez un autre email.'
      } else if (error?.message?.includes('Invalid email') || error?.code === 'invalid_email') {
        errorMessage = 'Adresse email invalide'
      } else if (error?.message?.includes('Password') || error?.code === 'weak_password') {
        errorMessage = 'Le mot de passe est trop faible (minimum 6 caractères)'
      } else if (error?.message?.includes('Failed to fetch') || error?.code === 'PGRST301') {
        errorMessage = 'Impossible de se connecter à Supabase. Vérifiez votre connexion internet et vos variables d\'environnement.'
      } else if (error?.message) {
        errorMessage = error.message
      } else if (error?.code) {
        errorMessage = `Erreur ${error.code}: ${error.message || 'Erreur inconnue'}`
      }
      
      toast.error(errorMessage, { duration: 6000 })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0 flex items-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* En-tête */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 mb-4">
                <UserPlus className="w-8 h-8 text-accent-600" />
              </div>
              <h1 className="font-heading text-3xl font-black text-primary-600 mb-2">
                Créer un compte
              </h1>
              <p className="text-gray-600">
                Rejoignez Ahimè et profitez de nos services
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Prénom et Nom */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom
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
                    Nom
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

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse email
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

              {/* Téléphone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone
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

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe
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

              {/* Confirmation mot de passe */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmer le mot de passe
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
                  <span>Création du compte...</span>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Créer mon compte</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">ou</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Lien de connexion */}
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Vous avez déjà un compte ?
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                <span>Se connecter</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Register
