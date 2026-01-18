import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { authService } from '../services/authService'
import { userService } from '../services/userService'

const Login = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log('🔄 Début de la connexion...')
      console.log('📧 Email:', formData.email)
      
      // Vérifier la configuration Supabase
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        const errorMsg = 'Configuration Supabase manquante. Vérifiez votre fichier .env dans frontend/ et redémarrez le serveur.'
        console.error('❌', errorMsg)
        toast.error(errorMsg, { duration: 8000 })
        return
      }

      // Se connecter avec Supabase Auth
      console.log('📤 Appel de authService.signIn...')
      const { data, error } = await authService.signIn({
        email: formData.email,
        password: formData.password,
      })

      console.log('📥 Réponse Supabase:', { 
        user: data?.user ? '✅ User connecté' : '❌ Pas de user',
        session: data?.session ? '✅ Session créée' : '❌ Pas de session',
        error: error ? `❌ ${error.message}` : '✅ Pas d\'erreur'
      })

      if (error) {
        console.error('❌ Erreur Supabase:', error)
        throw error
      }

      if (!data || !data.user) {
        throw new Error('Aucun utilisateur retourné par Supabase')
      }

      console.log('✅ Connexion réussie! User ID:', data.user.id)

      // Récupérer le profil pour vérifier le rôle
      try {
        const profile = await userService.getCurrentProfile()
        console.log('👤 Profil utilisateur:', profile ? '✅ Trouvé' : '❌ Non trouvé')
        console.log('🔑 Rôle:', profile?.role)

        // Rediriger selon le rôle ou la destination demandée
        if (redirectTo.startsWith('/admin')) {
          // Si on veut accéder à l'admin, vérifier le rôle
          if (profile?.role === 'admin') {
            console.log('✅ Admin - Redirection vers admin')
            navigate(redirectTo)
          } else {
            console.log('❌ Pas admin - Redirection vers /')
            toast.error('Accès refusé. Vous devez être administrateur.')
            navigate('/')
          }
        } else if (redirectTo.startsWith('/affiliate')) {
          // Si on veut accéder à l'affilié, vérifier le rôle
          if (profile?.role === 'affiliate' || profile?.role === 'admin') {
            console.log('✅ Affilié/Admin - Redirection vers affiliate')
            navigate(redirectTo)
          } else {
            console.log('❌ Pas affilié - Redirection vers /')
            toast.error('Accès refusé. Vous devez être affilié.')
            navigate('/')
          }
        } else {
          // Redirection normale
          console.log('✅ Redirection vers:', redirectTo)
          navigate(redirectTo)
        }
      } catch (profileError) {
        console.warn('⚠️ Erreur lors de la récupération du profil:', profileError)
        // Rediriger quand même si le profil n'est pas trouvé
        navigate(redirectTo)
      }

      toast.success('Connexion réussie !')
    } catch (error: any) {
      console.error('❌ Erreur complète lors de la connexion:', error)
      
      // Messages d'erreur personnalisés
      let errorMessage = 'Une erreur est survenue lors de la connexion'
      
      if (error?.message?.includes('Invalid login credentials') || error?.message?.includes('Invalid email or password')) {
        errorMessage = 'Email ou mot de passe incorrect'
      } else if (error?.message?.includes('Email not confirmed')) {
        errorMessage = 'Veuillez confirmer votre email avant de vous connecter'
      } else if (error?.message?.includes('Failed to fetch') || error?.code === 'PGRST301') {
        errorMessage = 'Impossible de se connecter à Supabase. Vérifiez votre connexion internet et vos variables d\'environnement.'
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      toast.error(errorMessage, { duration: 6000 })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                <LogIn className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="font-heading text-3xl font-black text-primary-600 mb-2">
                Connexion
              </h1>
              <p className="text-gray-600">
                Connectez-vous à votre compte Ahimè
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
              </div>

              {/* Mot de passe oublié */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
                  />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
              >
                {isLoading ? (
                  <span>Connexion...</span>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Se connecter</span>
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

            {/* Lien d'inscription */}
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Vous n'avez pas de compte ?
              </p>
              <Link
                to="/register"
                className="inline-flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                <span>Créer un compte</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login
